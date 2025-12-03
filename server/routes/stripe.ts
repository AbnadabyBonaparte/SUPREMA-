import express from 'express';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const router = express.Router();

// ==================== VALIDAÇÃO DE SCHEMAS ====================

const createCheckoutSessionSchema = z.object({
  priceId: z.string().min(1),
  userId: z.string().uuid(),
  userEmail: z.string().email(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

const createPortalSessionSchema = z.object({
  customerId: z.string().min(1),
  returnUrl: z.string().url(),
});

// ==================== CONFIGURAÇÃO ====================

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ==================== ROTAS ====================

/**
 * POST /api/stripe/create-checkout-session
 * Cria uma sessão de checkout do Stripe
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, userEmail, successUrl, cancelUrl } = createCheckoutSessionSchema.parse(req.body);

    // Verificar se o usuário já tem um customer no Stripe
    let customerId: string;
    
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (existingSubscription?.stripe_customer_id) {
      customerId = existingSubscription.stripe_customer_id;
    } else {
      // Criar novo customer no Stripe
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          user_id: userId,
        },
      });
      customerId = customer.id;

      // Salvar customer_id no perfil do usuário
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: userId,
      },
      subscription_data: {
        metadata: {
          user_id: userId,
        },
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/stripe/create-portal-session
 * Cria uma sessão do customer portal do Stripe
 */
router.post('/create-portal-session', async (req, res) => {
  try {
    const { customerId, returnUrl } = createPortalSessionSchema.parse(req.body);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão do portal:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/stripe/subscription/:userId
 * Busca a subscription ativa do usuário
 */
router.get('/subscription/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID é obrigatório' });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('current_period_end', new Date().toISOString())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.json({ subscription: null });
      }
      throw error;
    }

    res.json({ subscription: data });
  } catch (error) {
    console.error('Erro ao buscar subscription:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/stripe/subscriptions/:userId
 * Busca o histórico de subscriptions do usuário
 */
router.get('/subscriptions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID é obrigatório' });
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ subscriptions: data || [] });
  } catch (error) {
    console.error('Erro ao buscar histórico de subscriptions:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/stripe/cancel-subscription
 * Cancela uma subscription
 */
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { subscriptionId, userId } = req.body;

    if (!subscriptionId || !userId) {
      return res.status(400).json({ error: 'Subscription ID e User ID são obrigatórios' });
    }

    // Verificar se a subscription pertence ao usuário
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscriptionId)
      .eq('user_id', userId)
      .single();

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription não encontrada' });
    }

    // Cancelar no Stripe
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    // Atualizar no Supabase
    await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscriptionId);

    res.json({ 
      success: true, 
      subscription: canceledSubscription,
      message: 'Subscription cancelada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao cancelar subscription:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/stripe/plans
 * Lista os planos disponíveis
 */
router.get('/plans', async (req, res) => {
  try {
    // Buscar produtos e preços do Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    const plans = products.data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.default_price ? (product.default_price as Stripe.Price).unit_amount! / 100 : 0,
      priceId: product.default_price ? (product.default_price as Stripe.Price).id : null,
      currency: product.default_price ? (product.default_price as Stripe.Price).currency : 'brl',
      interval: product.default_price ? (product.default_price as Stripe.Price).recurring?.interval : 'month',
      metadata: product.metadata,
    }));

    res.json({ plans });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/stripe/update-payment-method
 * Atualiza o método de pagamento de uma subscription
 */
router.post('/update-payment-method', async (req, res) => {
  try {
    const { subscriptionId, paymentMethodId, userId } = req.body;

    if (!subscriptionId || !paymentMethodId || !userId) {
      return res.status(400).json({ 
        error: 'Subscription ID, Payment Method ID e User ID são obrigatórios' 
      });
    }

    // Verificar se a subscription pertence ao usuário
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('stripe_subscription_id', subscriptionId)
      .eq('user_id', userId)
      .single();

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription não encontrada' });
    }

    // Anexar o método de pagamento ao customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: subscription.stripe_customer_id,
    });

    // Definir como método padrão
    await stripe.customers.update(subscription.stripe_customer_id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Atualizar a subscription
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      default_payment_method: paymentMethodId,
    });

    res.json({ 
      success: true, 
      subscription: updatedSubscription,
      message: 'Método de pagamento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar método de pagamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;

