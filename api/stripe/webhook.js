// Vercel Serverless Function para Webhook do Stripe
// Este arquivo permite que o webhook funcione no Vercel sem servidor Express separado

const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

// Configuração
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Funções auxiliares
async function upsertSubscription(subscriptionData) {
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

async function getUserIdByCustomerId(stripeCustomerId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (error || !data) {
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

function mapStripePriceToPlan(priceId) {
  const planMapping = {
    'price_1234567890': 'pro',
    'price_0987654321': 'premium',
    'price_1122334455': 'luxury',
  };
  return planMapping[priceId] || 'pro';
}

async function sendToN8n(payload) {
  try {
    if (!process.env.N8N_WEBHOOK_URL) {
      console.log('⚠️ N8N_WEBHOOK_URL não configurada, pulando envio');
      return;
    }

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
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
  }
}

// Handler principal
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verificação de segurança do webhook
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Webhook verificado com sucesso:', event.type);
  } catch (err) {
    console.error('❌ Erro na verificação do webhook:', err.message);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        if (session.mode === 'subscription' && session.subscription) {
          console.log('🎯 Processando checkout.session.completed para subscription');
          
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          const customerId = session.customer;
          
          try {
            const userId = await getUserIdByCustomerId(customerId);
            const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);
            
            const subscriptionData = {
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              status: subscription.status,
              plan_id: planId,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            };

            await upsertSubscription(subscriptionData);

            if (subscription.status === 'active') {
              await sendToN8n({
                event: 'subscription_active',
                user_id: userId,
                plan: planId,
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
        const subscription = event.data.object;
        console.log('🎯 Processando customer.subscription.created');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer);
          const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);

          const subscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            plan_id: planId,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          };

          await upsertSubscription(subscriptionData);

          if (subscription.status === 'active') {
            await sendToN8n({
              event: 'subscription_active',
              user_id: userId,
              plan: planId,
              subscription_id: subscription.id,
              customer_id: subscription.customer,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('❌ Erro ao processar customer.subscription.created:', error);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log('🎯 Processando customer.subscription.updated');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer);
          const planId = mapStripePriceToPlan(subscription.items.data[0].price.id);

          const subscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            plan_id: planId,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          };

          await upsertSubscription(subscriptionData);

          if (subscription.status === 'active') {
            await sendToN8n({
              event: 'subscription_active',
              user_id: userId,
              plan: planId,
              subscription_id: subscription.id,
              customer_id: subscription.customer,
              timestamp: new Date().toISOString(),
            });
          } else if (['canceled', 'past_due'].includes(subscription.status)) {
            await sendToN8n({
              event: 'subscription_canceled',
              user_id: userId,
              subscription_id: subscription.id,
              customer_id: subscription.customer,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('❌ Erro ao processar customer.subscription.updated:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('🎯 Processando customer.subscription.deleted');

        try {
          const userId = await getUserIdByCustomerId(subscription.customer);

          const subscriptionData = {
            user_id: userId,
            stripe_customer_id: subscription.customer,
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
            customer_id: subscription.customer,
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
};
