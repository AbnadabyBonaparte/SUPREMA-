import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import stripeRoutes from './routes/stripe';

// ==================== CONFIGURAÇÃO DO AMBIENTE ====================

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY é obrigatório'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET é obrigatório'),
  SUPABASE_URL: z.string().url('SUPABASE_URL deve ser uma URL válida'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY é obrigatório'),
  N8N_WEBHOOK_URL: z.string().url('N8N_WEBHOOK_URL deve ser uma URL válida'),
  PORT: z.string().optional().default('3001'),
});

const env = envSchema.parse(process.env);

// ==================== INICIALIZAÇÃO DOS SERVIÇOS ====================

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const app = express();

// ==================== MIDDLEWARES ====================

app.use(cors({
  origin: ['http://localhost:5173', 'https://alsham.com.br', 'https://*.vercel.app'],
  credentials: true,
}));

// Middleware especial para webhook do Stripe (raw body)
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// JSON middleware para outras rotas
app.use(express.json());

// ==================== ROTAS ====================

// Rotas do Stripe (exceto webhook que já está definido abaixo)
app.use('/api/stripe', stripeRoutes);

// ==================== INTERFACES TYPESCRIPT ====================

interface SubscriptionData {
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
  plan_id: string;
  current_period_end: string;
  created_at?: string;
  updated_at?: string;
}

interface N8nWebhookPayload {
  event: 'subscription_active' | 'subscription_canceled';
  user_id: string;
  plan?: 'pro' | 'premium' | 'luxury';
  subscription_id?: string;
  customer_id?: string;
  timestamp: string;
}

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Atualiza ou cria uma subscription no Supabase
 */
async function upsertSubscription(subscriptionData: SubscriptionData) {
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    })
    .select()
    .single();

  if (error) {
    console.error('❌ Erro ao atualizar subscription no Supabase:', error);
    throw new Error(`Falha ao salvar subscription: ${error.message}`);
  }

  console.log('✅ Subscription atualizada no Supabase:', data);
  return data;
}

/**
 * Busca o user_id baseado no customer_id do Stripe
 */
async function getUserIdByCustomerId(stripeCustomerId: string): Promise<string> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (error || !data) {
    // Se não encontrar na tabela subscriptions, tentar na tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('stripe_customer_id', stripeCustomerId)
      .single();

    if (userError || !userData) {
      throw new Error(`Usuário não encontrado para customer_id: ${stripeCustomerId}`);
    }
    return userData.id;
  }

  return data.user_id;
}

/**
 * Mapeia o price_id do Stripe para o plan_id interno
 */
function mapStripePriceToPlan(priceId: string): string {
  const planMapping: Record<string, string> = {
    // Adicione aqui os price_ids reais do seu Stripe
    'price_1234567890': 'pro',
    'price_0987654321': 'premium',
    'price_1122334455': 'luxury',
  };

  return planMapping[priceId] || 'pro'; // Default para 'pro'
}

/**
 * Envia evento para o n8n
 */
async function sendToN8n(payload: N8nWebhookPayload) {
  try {
    const response = await fetch(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Alsham-Suprema-Webhook/1.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Evento enviado para n8n:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar para n8n:', error);
    // Não re-throw para não falhar o webhook do Stripe
    // Em produção, considere implementar uma fila de retry
  }
}

// ==================== WEBHOOK DO STRIPE ====================

app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    // Verificação de segurança do webhook
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Webhook verificado com sucesso:', event.type);
  } catch (err: any) {
    console.error('❌ Erro na verificação do webhook:', err.message);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          console.log('🎯 Processando checkout.session.completed para subscription');
          
          // Buscar detalhes da subscription
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const customerId = session.customer as string;
          
          try {
            const userId = await getUserIdByCustomerId(customerId);
            const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);
            
            const subscriptionData: SubscriptionData = {
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              status: subscription.status as any,
              plan_id: planId,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            };

            await upsertSubscription(subscriptionData);

            // Se a subscription está ativa, notificar n8n
            if (subscription.status === 'active') {
              await sendToN8n({
                event: 'subscription_active',
                user_id: userId,
                plan: planId as any,
                subscription_id: subscription.id,
                customer_id: customerId,
                timestamp: new Date().toISOString(),
              });
            }
          } catch (error) {
            console.error('❌ Erro ao processar checkout.session.completed:', error);
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🎯 Processando customer.subscription.created');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer as string);
          const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);

          const subscriptionData: SubscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            status: subscription.status as any,
            plan_id: planId,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          };

          await upsertSubscription(subscriptionData);

          if (subscription.status === 'active') {
            await sendToN8n({
              event: 'subscription_active',
              user_id: userId,
              plan: planId as any,
              subscription_id: subscription.id,
              customer_id: subscription.customer as string,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('❌ Erro ao processar customer.subscription.created:', error);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🎯 Processando customer.subscription.updated');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer as string);
          const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);

          const subscriptionData: SubscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            status: subscription.status as any,
            plan_id: planId,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          };

          await upsertSubscription(subscriptionData);

          // Notificar n8n baseado no status
          if (subscription.status === 'active') {
            await sendToN8n({
              event: 'subscription_active',
              user_id: userId,
              plan: planId as any,
              subscription_id: subscription.id,
              customer_id: subscription.customer as string,
              timestamp: new Date().toISOString(),
            });
          } else if (['canceled', 'past_due'].includes(subscription.status)) {
            await sendToN8n({
              event: 'subscription_canceled',
              user_id: userId,
              subscription_id: subscription.id,
              customer_id: subscription.customer as string,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('❌ Erro ao processar customer.subscription.updated:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🎯 Processando customer.subscription.deleted');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer as string);

          const subscriptionData: SubscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            status: 'canceled',
            plan_id: mapStripePriceToPlan(subscription.items.data[0].price.id),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          };

          await upsertSubscription(subscriptionData);

          await sendToN8n({
            event: 'subscription_canceled',
            user_id: userId,
            subscription_id: subscription.id,
            customer_id: subscription.customer as string,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error('❌ Erro ao processar customer.subscription.deleted:', error);
        }
        break;
      }

      default:
        console.log(`⚠️  Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('❌ Erro geral no webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== ROTAS DE SAÚDE ====================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Alsham Suprema Beleza - Webhook Server',
    version: '1.0.0'
  });
});

app.get('/api/stripe/health', async (req, res) => {
  try {
    // Teste básico de conectividade com Stripe
    await stripe.customers.list({ limit: 1 });
    
    // Teste básico de conectividade com Supabase
    const { data, error } = await supabase.from('subscriptions').select('count').limit(1);
    
    if (error) throw error;

    res.json({ 
      status: 'ok',
      services: {
        stripe: 'connected',
        supabase: 'connected',
        n8n: env.N8N_WEBHOOK_URL ? 'configured' : 'not_configured'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Health check failed:', error);
    res.status(500).json({ 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// ==================== INICIALIZAÇÃO DO SERVIDOR ====================

const PORT = parseInt(env.PORT);

app.listen(PORT, () => {
  console.log(`
🚀 Alsham Suprema Beleza - Webhook Server
📡 Servidor rodando na porta ${PORT}
🔗 Webhook URL: http://localhost:${PORT}/api/stripe/webhook
💚 Health Check: http://localhost:${PORT}/health
🎯 Stripe Health: http://localhost:${PORT}/api/stripe/health

📋 Eventos suportados:
   ✅ checkout.session.completed
   ✅ customer.subscription.created  
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted

🔐 Configurações necessárias:
   • STRIPE_SECRET_KEY
   • STRIPE_WEBHOOK_SECRET  
   • SUPABASE_URL
   • SUPABASE_SERVICE_ROLE_KEY
   • N8N_WEBHOOK_URL
  `);
});

export default app;
