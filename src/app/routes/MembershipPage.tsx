// src/pages/MembershipPage.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SubscriptionManager from '@/components/SubscriptionManager';
import { useAppContext } from '@/contexts/AppContext';

interface MembershipPageProps {
    onPlanSelect?: () => void;
}

export function MembershipPage({ onPlanSelect }: MembershipPageProps) {
    const { user } = useAppContext();
    // Se o usuário estiver logado, mostrar o gerenciador de assinaturas
    if (user) {
        return (
            <div className="min-h-screen bg-black text-white py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-serif text-white mb-4">GERENCIAR ASSINATURA</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Controle sua assinatura, altere planos e gerencie pagamentos
                        </p>
                    </div>
                    
                    <SubscriptionManager 
                        userId={user.id} 
                        userEmail={user.email} 
                    />
                </div>
            </div>
        );
    }

    // Página de apresentação para usuários não logados
    const handleSubscribe = (plan: 'free' | 'prime') => {
        if (plan === 'prime') {
            alert('Faça login primeiro para assinar um plano premium!');
        } else {
            alert('Faça login primeiro para criar sua conta!');
        }
        if (onPlanSelect) onPlanSelect();
    };

    return (
        <div className="py-10 text-center">
            <h2 className="text-5xl font-serif text-foreground mb-3">ESCOLHA SEU NÍVEL</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                Desbloqueie o poder total da Inteligência Artificial e garanta acesso prioritário aos melhores profissionais do mundo.
            </p>

            <div className="flex flex-wrap justify-center gap-10">
                {/* FREE PLAN */}
                <Card className="bg-white/5 border-[#333] p-10 w-full max-w-sm text-left flex flex-col">
                    <h3 className="text-gray-400 text-2xl mb-3">Member</h3>
                    <div className="text-5xl font-bold text-foreground mb-8">
                        R$ 0<span className="text-xl text-gray-600">/mês</span>
                    </div>

                    <ul className="space-y-4 text-gray-300 mb-10 flex-1">
                        <li className="flex gap-3">✓ Acesso ao Booking System</li>
                        <li className="flex gap-3">✓ 1 Consulta de Estilo por mês</li>
                        <li className="flex gap-3">✓ Acesso à Loja</li>
                        <li className="flex gap-3 opacity-50">✕ Sem Try-On (Simulação)</li>
                        <li className="flex gap-3 opacity-50">✕ Sem descontos</li>
                    </ul>

                    <Button
                        onClick={() => handleSubscribe('free')}
                        variant="outline"
                        className="w-full border-gray-600 text-white hover:bg-gray-800 uppercase font-bold"
                        size="lg"
                    >
                        Criar Conta Grátis
                    </Button>
                </Card>

                {/* PRIME PLAN (FEATURED) */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#050505] border-2 border-[#D4AF37] p-10 w-full max-w-sm text-left flex flex-col relative transform scale-105 shadow-2xl shadow-[#D4AF37]/20">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Recomendado
                    </div>

                    <h3 className="text-[#D4AF37] text-2xl mb-3 font-serif">Alsham Prime</h3>
                    <div className="text-5xl font-bold text-foreground mb-8">
                        R$ 39,90<span className="text-xl text-gray-600">/mês</span>
                    </div>

                    <ul className="space-y-4 text-foreground mb-10 flex-1">
                        <li className="flex gap-3">
                            <span className="text-[#D4AF37]">✦</span> Consultorias AI Ilimitadas
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#D4AF37]">✦</span> Realidade Suprema (Try-On) Ilimitado
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#D4AF37]">✦</span> 10% OFF em Serviços e Produtos
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#D4AF37]">✦</span> Status Black no Loyalty
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#D4AF37]">✦</span> Acesso Antecipado a Tendências
                        </li>
                    </ul>

                    <Button
                        onClick={() => handleSubscribe('prime')}
                        className="w-full bg-[#D4AF37] text-black hover:bg-[#F2D06B] font-bold uppercase tracking-wider py-4"
                        size="lg"
                    >
                        Assinar Agora
                    </Button>

                    <p className="text-center text-gray-600 text-xs mt-4">
                        Powered by <strong>Stripe</strong>. Cancele quando quiser.
                    </p>
                </Card>
            </div>

            {/* Additional Benefits */}
            <div className="mt-20 max-w-4xl mx-auto">
                <h3 className="text-2xl text-[#D4AF37] mb-8">Benefícios Exclusivos Prime</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: '🎨', title: 'IA Ilimitada', desc: 'Consultas sem limite de uso' },
                        { icon: '💎', title: 'Desconto 10%', desc: 'Em todos os serviços e produtos' },
                        { icon: '⚡', title: 'Acesso Antecipado', desc: 'Novas features em primeira mão' }
                    ].map((benefit, idx) => (
                        <Card key={idx} className="bg-[#1A1A1A] border-[#333] p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl mb-3">{benefit.icon}</div>
                            <h4 className="text-white font-bold mb-2">{benefit.title}</h4>
                            <p className="text-gray-500 text-sm">{benefit.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MembershipPage;
