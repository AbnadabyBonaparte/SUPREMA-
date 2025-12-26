import { env } from '@/lib/env';
import { supabase } from '@/lib/supabaseClient';

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

// ==================== STRIPE CLIENT-SIDE ====================
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
      loadStripe(env.VITE_STRIPE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    );
  }
  return stripePromise;
};

// ==================== FUNÇÕES DE SUBSCRIPTION ====================
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
      if (error.code === 'PGRST116') return null; // Nenhum registro
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro ao buscar subscription:', error);
    return null;
  }
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription !== null;
}

export async function getUserPlan(userId: string): Promise<string> {
  const subscription = await getUserSubscription(userId);
  return subscription?.plan_id || 'free';
}

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
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
}

// ==================== CHECKOUT & PORTAL ====================
export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) throw new Error(`Erro ${response.status}`);
  const { sessionId } = await response.json();
  return sessionId;
}

export async function redirectToCheckout(params: CreateCheckoutSessionParams) {
  const stripe = await getStripe();
  if (!stripe) throw new Error('Stripe não carregado');
  const sessionId = await createCheckoutSession(params);
  await stripe.redirectToCheckout({ sessionId });
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  const response = await fetch('/api/stripe/create-portal-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, returnUrl }),
  });

  if (!response.ok) throw new Error(`Erro ${response.status}`);
  const { url } = await response.json();
  return url;
}

export async function redirectToCustomerPortal(customerId: string, returnUrl: string) {
  const url = await createCustomerPortalSession(customerId, returnUrl);
  window.location.href = url;
}

// ==================== PLANOS ====================
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
    priceId: 'price_pro_monthly',
    features: ['IA ilimitada', 'Try-On AR/VR', 'Descontos exclusivos', 'Suporte prioritário', 'Sem taxas de agendamento'],
    color: 'from-gold/20 to-gold/5',
  },
  premium: {
    id: 'premium',
    name: 'Alsham Premium',
    description: 'Para profissionais e criadores de conteúdo',
    price: 79.90,
    priceId: 'price_premium_monthly',
    features: ['Tudo do Pro', 'Creator Suite', 'Analytics avançados', 'API access', 'Comissões maiores', 'Dashboard profissional'],
    popular: true,
    color: 'from-purple-500/20 to-purple-500/5',
  },
  luxury: {
    id: 'luxury',
    name: 'Alsham Luxury',
    description: 'Experiência premium completa',
    price: 149.90,
    priceId: 'price_luxury_monthly',
    features: ['Tudo do Premium', 'Consultoria personalizada', 'Produtos exclusivos', 'Atendimento VIP', 'Eventos exclusivos', 'Concierge service'],
    color: 'from-gold/30 to-gold/10',
  },
};

export function getPlanConfig(planId: string): PlanConfig | null {
  return PLANS[planId] || null;
}

export function canAccessFeature(userPlan: string, requiredPlan: string): boolean {
  const hierarchy = ['free', 'pro', 'premium', 'luxury'];
  return hierarchy.indexOf(userPlan) >= hierarchy.indexOf(requiredPlan);
}

// ==================== HOOKS & UTILS ====================
import { useState, useEffect } from 'react';

export function useSubscription(userId: string | null) {
  const [subscription, setSubscription] = useState<StripeSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    getUserSubscription(userId).then(setSubscription).finally(() => setLoading(false));
  }, [userId]);

  return { subscription, loading };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export function formatSubscriptionDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
}

export function isSubscriptionExpiringSoon(subscription: StripeSubscription): boolean {
  const expiration = new Date(subscription.current_period_end);
  const sevenDays = new Date();
  sevenDays.setDate(sevenDays.getDate() + 7);
  return expiration <= sevenDays;
}
