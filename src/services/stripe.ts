import { env } from '@/lib/env';
import { supabase } from './supabaseClient';

// ==================== INTERFACES ====================

export interface StripeSubscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
  plan_id: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCheckoutSessionParams {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
}

// ==================== CONFIGURAÇÃO DO STRIPE (CLIENT-SIDE) ====================

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
      loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY)
    );
  }
  return stripePromise;
};

// ==================== FUNÇÕES DE SUBSCRIPTION ====================

/**
 * Busca a subscription ativa do usuário
 */
export async function getUserSubscription(userId: string): Promise<StripeSubscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('current_period_end', new Date().toISOString())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhuma subscription encontrada
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar subscription do usuário:', error);
    return null;
  }
}

/**
 * Verifica se o usuário tem uma subscription ativa
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription !== null;
}

/**
 * Busca o plano atual do usuário
 */
export async function getUserPlan(userId: string): Promise<string> {
  const subscription = await getUserSubscription(userId);
  return subscription?.plan_id || 'free';
}

/**
 * Busca todas as subscriptions do usuário (histórico)
 */
export async function getUserSubscriptionHistory(userId: string): Promise<StripeSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar histórico de subscriptions:', error);
    return [];
  }
}

// ==================== FUNÇÕES DE CHECKOUT ====================

/**
 * Cria uma sessão de checkout do Stripe
 */
export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    throw error;
  }
}

/**
 * Redireciona para o checkout do Stripe
 */
export async function redirectToCheckout(params: CreateCheckoutSessionParams) {
  try {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe não foi carregado');

    const sessionId = await createCheckoutSession(params);

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error('Erro no redirecionamento para checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao redirecionar para checkout:', error);
    throw error;
  }
}

// ==================== FUNÇÕES DE CUSTOMER PORTAL ====================

/**
 * Cria uma sessão do customer portal do Stripe
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Erro ao criar sessão do portal:', error);
    throw error;
  }
}

/**
 * Redireciona para o customer portal do Stripe
 */
export async function redirectToCustomerPortal(customerId: string, returnUrl: string) {
  try {
    const url = await createCustomerPortalSession(customerId, returnUrl);
    window.location.href = url;
  } catch (error) {
    console.error('Erro ao redirecionar para portal:', error);
    throw error;
  }
}

// ==================== FUNÇÕES DE PLANOS ====================

export interface PlanConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export const PLANS: Record<string, PlanConfig> = {
  pro: {
    id: 'pro',
    name: 'Alsham Pro',
    description: 'Para usuários que querem mais funcionalidades',
    price: 39.90,
    priceId: 'price_pro_monthly', // Substitua pelo price_id real do Stripe
    features: [
      'IA ilimitada',
      'Try-On AR/VR',
      'Descontos exclusivos',
      'Suporte prioritário',
      'Sem taxas de agendamento'
    ],
    color: 'from-gold/20 to-gold/5',
  },
  premium: {
    id: 'premium',
    name: 'Alsham Premium',
    description: 'Para profissionais e criadores de conteúdo',
    price: 79.90,
    priceId: 'price_premium_monthly', // Substitua pelo price_id real do Stripe
    features: [
      'Tudo do Pro',
      'Creator Suite',
      'Analytics avançados',
      'API access',
      'Comissões maiores',
      'Dashboard profissional'
    ],
    popular: true,
    color: 'from-purple-500/20 to-purple-500/5',
  },
  luxury: {
    id: 'luxury',
    name: 'Alsham Luxury',
    description: 'Experiência premium completa',
    price: 149.90,
    priceId: 'price_luxury_monthly', // Substitua pelo price_id real do Stripe
    features: [
      'Tudo do Premium',
      'Consultoria personalizada',
      'Produtos exclusivos',
      'Atendimento VIP',
      'Eventos exclusivos',
      'Concierge service'
    ],
    color: 'from-gold/30 to-gold/10',
  },
};

/**
 * Busca a configuração de um plano
 */
export function getPlanConfig(planId: string): PlanConfig | null {
  return PLANS[planId] || null;
}

/**
 * Verifica se o usuário pode acessar uma funcionalidade baseada no plano
 */
export function canAccessFeature(userPlan: string, requiredPlan: string): boolean {
  const planHierarchy = ['free', 'pro', 'premium', 'luxury'];
  const userPlanIndex = planHierarchy.indexOf(userPlan);
  const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
  
  return userPlanIndex >= requiredPlanIndex;
}

// ==================== HOOKS UTILITÁRIOS ====================

/**
 * Hook para verificar o status da subscription do usuário
 */
export function useSubscription(userId: string | null) {
  const [subscription, setSubscription] = useState<StripeSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    getUserSubscription(userId)
      .then(setSubscription)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { subscription, loading, error };
}

// Importar React hooks se necessário
import { useState, useEffect } from 'react';

// ==================== UTILITÁRIOS ====================

/**
 * Formata o preço para exibição
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Formata a data de expiração da subscription
 */
export function formatSubscriptionDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

/**
 * Verifica se uma subscription está próxima do vencimento (7 dias)
 */
export function isSubscriptionExpiringSoon(subscription: StripeSubscription): boolean {
  const expirationDate = new Date(subscription.current_period_end);
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
  return expirationDate <= sevenDaysFromNow;
}

