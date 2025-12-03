// src/pages/PartnerPage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function PartnerPage() {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        city: '',
        type: 'salon'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            alert('Cadastro enviado! Nossa equipe entrará em contato em até 48h.');
        }, 1500);
    };

    return (
        <div className="py-10">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-foreground mb-4">Seja um Parceiro Alsham</h1>
                <p className="text-xl text-[#D4AF37] uppercase tracking-[2px] mb-6">Programa B2B para Profissionais</p>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                    Junte-se à rede de elite de salões e profissionais de beleza. Receba clientes qualificados,
                    aumente sua visibilidade e faça parte do futuro da beleza com IA.
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                    {
                        icon: '👥',
                        title: 'Clientes Qualificados',
                        desc: 'Receba agendamentos de clientes pré-selecionados pela IA'
                    },
                    {
                        icon: '📊',
                        title: 'Dashboard Profissional',
                        desc: 'Gerencie agenda, pagamentos e métricas em tempo real'
                    },
                    {
                        icon: '🎯',
                        title: 'Marketing Gratuito',
                        desc: 'Apareça nas buscas e recomendações da plataforma'
                    },
                    {
                        icon: '💳',
                        title: 'Pagamento Garantido',
                        desc: 'Receba via Stripe com taxa competitiva de 8%'
                    },
                    {
                        icon: '🤖',
                        title: 'IA Integrada',
                        desc: 'Use nossas ferramentas de IA para consultoria com clientes'
                    },
                    {
                        icon: '📈',
                        title: 'Crescimento Acelerado',
                        desc: 'Acesso a dados e insights para expandir seu negócio'
                    }
                ].map((benefit, idx) => (
                    <Card key={idx} className="bg-[#1A1A1A] border-[#333] p-6 text-center hover:border-[#D4AF37]/50 transition-colors">
                        <div className="text-5xl mb-4">{benefit.icon}</div>
                        <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-gray-500 text-sm">{benefit.desc}</p>
                    </Card>
                ))}
            </div>

            {/* Registration Form */}
            <Card className="max-w-2xl mx-auto bg-[#121212] border-[#333] p-10">
                <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Cadastre seu Negócio</h2>
                <p className="text-gray-500 text-center mb-8">Preencha o formulário e nossa equipe entrará em contato</p>

                {submitted ? (
                    <div className="text-center py-10">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl text-[#D4AF37] mb-3">Cadastro Recebido!</h3>
                        <p className="text-gray-400">Entraremos em contato em até 48 horas úteis.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Nome do Estabelecimento *</label>
                            <input
                                type="text"
                                required
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="Barbearia Viking Prime"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Nome do Proprietário *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.ownerName}
                                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="João Silva"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Tipo de Negócio *</label>
                                <select
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                >
                                    <option value="salon">Salão de Beleza</option>
                                    <option value="barbershop">Barbearia</option>
                                    <option value="spa">Spa/Estética</option>
                                    <option value="tattoo">Estúdio de Tatuagem</option>
                                    <option value="nails">Nail Studio</option>
                                    <option value="freelancer">Profissional Autônomo</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Email Comercial *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="contato@salao.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Telefone/WhatsApp *</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Cidade *</label>
                            <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white rounded-lg focus:outline-none focus:border-[#D4AF37]/50"
                                placeholder="São Paulo - SP"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#D4AF37] text-black hover:bg-[#F2D06B] font-bold uppercase tracking-wider py-4 disabled:opacity-70"
                            size="lg"
                        >
                            {isSubmitting ? 'Enviando...' : 'Quero Ser Parceiro'}
                        </Button>

                        <p className="text-xs text-gray-600 text-center mt-4">
                            Ao enviar, você concorda com nossos termos de parceria B2B.
                        </p>
                    </form>
                )}
            </Card>

            {/* Stats Section */}
            <div className="mt-20 grid md:grid-cols-4 gap-6 text-center">
                {[
                    { number: '500+', label: 'Parceiros Ativos' },
                    { number: '50k+', label: 'Agendamentos/Mês' },
                    { number: '4.9★', label: 'Avaliação Média' },
                    { number: 'R$ 2M+', label: 'Processado/Mês' }
                ].map((stat, idx) => (
                    <div key={idx}>
                        <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.number}</div>
                        <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartnerPage;
