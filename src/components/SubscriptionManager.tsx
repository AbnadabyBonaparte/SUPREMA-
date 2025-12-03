import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Calendar, 
  Crown, 
  Zap, 
  Star, 
  CheckCircle, 
  XCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { 
  StripeSubscription, 
  PLANS, 
  PlanConfig, 
  redirectToCheckout, 
  redirectToCustomerPortal,
  formatPrice,
  formatSubscriptionDate,
  isSubscriptionExpiringSoon,
  useSubscription
} from '@/services/stripe';

// ==================== INTERFACES ====================

interface SubscriptionManagerProps {
  userId: string;
  userEmail: string;
}

interface PlanCardProps {
  plan: PlanConfig;
  currentPlan?: string;
  isLoading: boolean;
  onSelectPlan: (planId: string) => void;
}

// ==================== COMPONENTES ====================

function PlanCard({ plan, currentPlan, isLoading, onSelectPlan }: PlanCardProps) {
  const isCurrentPlan = currentPlan === plan.id;
  const isFreePlan = currentPlan === 'free' || !currentPlan;

  return (
    <Card className={`relative overflow-hidden transition-all hover:scale-105 ${
      plan.popular ? 'ring-2 ring-gold' : ''
    } ${isCurrentPlan ? 'bg-gold/10 border-gold' : 'bg-gray-900/50 border-gray-700'}`}>
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gold to-yellow-500 text-black text-center py-1 text-sm font-bold">
          MAIS POPULAR
        </div>
      )}
      
      <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            {plan.id === 'pro' && <Zap className="w-8 h-8 text-gold mr-2" />}
            {plan.id === 'premium' && <Crown className="w-8 h-8 text-purple-500 mr-2" />}
            {plan.id === 'luxury' && <Star className="w-8 h-8 text-gold mr-2" />}
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
          </div>
          <p className="text-gray-400 mb-4">{plan.description}</p>
          <div className="text-4xl font-bold text-white mb-2">
            {formatPrice(plan.price)}
            <span className="text-lg text-gray-400">/mês</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onSelectPlan(plan.id)}
          disabled={isLoading || isCurrentPlan}
          className={`w-full ${
            isCurrentPlan 
              ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed' 
              : plan.popular 
                ? 'bg-gold hover:bg-gold/90 text-black' 
                : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          {isCurrentPlan ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Plano Atual
            </>
          ) : (
            `Assinar ${plan.name}`
          )}
        </Button>
      </div>
    </Card>
  );
}

function CurrentSubscriptionCard({ subscription }: { subscription: StripeSubscription }) {
  const [isLoading, setIsLoading] = useState(false);
  const plan = PLANS[subscription.plan_id];
  const isExpiringSoon = isSubscriptionExpiringSoon(subscription);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      await redirectToCustomerPortal(
        subscription.stripe_customer_id,
        window.location.href
      );
    } catch (error) {
      console.error('Erro ao abrir portal do cliente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Crown className="w-6 h-6 text-gold mr-2" />
            <h3 className="text-xl font-bold text-white">Sua Assinatura</h3>
          </div>
          <Badge 
            variant={subscription.status === 'active' ? 'default' : 'destructive'}
            className={subscription.status === 'active' ? 'bg-green-600' : ''}
          >
            {subscription.status === 'active' ? 'Ativa' : 'Inativa'}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Plano Atual</p>
            <p className="text-white font-semibold">{plan?.name || subscription.plan_id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Próxima Cobrança</p>
            <p className={`font-semibold ${isExpiringSoon ? 'text-yellow-500' : 'text-white'}`}>
              {formatSubscriptionDate(subscription.current_period_end)}
            </p>
          </div>
        </div>

        {isExpiringSoon && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center text-yellow-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Sua assinatura expira em breve. Renove para continuar aproveitando os benefícios.
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="flex-1 bg-gray-700 hover:bg-gray-600"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CreditCard className="w-4 h-4 mr-2" />
            )}
            Gerenciar Assinatura
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => window.open('mailto:suporte@alsham.com.br', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Suporte
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ==================== COMPONENTE PRINCIPAL ====================

export default function SubscriptionManager({ userId, userEmail }: SubscriptionManagerProps) {
  const { subscription, loading, error } = useSubscription(userId);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = async (planId: string) => {
    const plan = PLANS[planId];
    if (!plan) return;

    setIsProcessing(true);
    try {
      await redirectToCheckout({
        priceId: plan.priceId,
        userId,
        userEmail,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/membership?canceled=true`,
      });
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
        <span className="ml-2 text-gray-400">Carregando informações da assinatura...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/30 p-6">
        <div className="flex items-center text-red-400">
          <XCircle className="w-5 h-5 mr-2" />
          <span>Erro ao carregar informações da assinatura: {error}</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Assinatura Atual */}
      {subscription && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Assinatura Atual</h2>
          <CurrentSubscriptionCard subscription={subscription} />
        </div>
      )}

      {/* Planos Disponíveis */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {subscription ? 'Alterar Plano' : 'Escolha Seu Plano'}
        </h2>
        <p className="text-gray-400 mb-6">
          {subscription 
            ? 'Upgrade ou downgrade sua assinatura a qualquer momento.'
            : 'Desbloqueie todo o potencial da plataforma Alsham Suprema Beleza.'
          }
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.values(PLANS).map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlan={subscription?.plan_id}
              isLoading={isProcessing}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
      </div>

      {/* Informações Adicionais */}
      <Card className="bg-gray-900/30 border-gray-700">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Informações Importantes</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Todas as assinaturas são cobradas mensalmente</li>
            <li>• Você pode cancelar ou alterar seu plano a qualquer momento</li>
            <li>• Suporte prioritário para assinantes Premium e Luxury</li>
            <li>• Política de reembolso de 7 dias para novos assinantes</li>
            <li>• Pagamentos processados com segurança pelo Stripe</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
