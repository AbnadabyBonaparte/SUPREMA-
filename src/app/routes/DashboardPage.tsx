// src/pages/DashboardPage.tsx
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppointments } from '@/hooks/useAppointments';
import { useApp } from '@/contexts/AppContext';
import { Loader2 } from 'lucide-react';

export function DashboardPage() {
    const { user } = useApp();
    const { appointments, loading, error } = useAppointments();

    // Filter upcoming appointments (next 30 days)
    const upcomingAppointments = useMemo(() => {
        if (!appointments) return [];
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return appointments
            .filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate >= now && aptDate <= thirtyDaysFromNow && 
                       (apt.status === 'pending' || apt.status === 'confirmed');
            })
            .slice(0, 5)
            .map(apt => ({
                id: apt.id,
                service: apt.service,
                professional: apt.professional_name || 'N/A',
                salon: apt.salon_name || 'N/A',
                date: new Date(apt.date).toISOString().split('T')[0],
                time: new Date(apt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                price: apt.service_price || 0,
            }));
    }, [appointments]);

    // TODO: Implement AI recommendations system
    const recentRecommendations: any[] = [];

    // TODO: Implement loyalty points system
    const loyaltyPoints = 2450;
    const nextTierPoints = 3000;
    const progressPercent = (loyaltyPoints / nextTierPoints) * 100;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted">Carregando dashboard...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-error mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
        );
    }

    return (
        <div className="py-10">
            {/* Welcome Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif text-foreground mb-2">Bem-vindo de volta! 👋</h1>
                <p className="text-muted">Aqui está um resumo da sua jornada Alsham</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 p-6">
                    <div className="text-sm text-muted mb-2">Pontos Supreme</div>
                    <div className="text-4xl font-bold text-primary mb-3">{loyaltyPoints.toLocaleString()}</div>
                    <div className="w-full bg-background/30 rounded-full h-2 mb-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <div className="text-xs text-muted">{Math.round(progressPercent)}% para Status Ouro</div>
                </Card>

                <Card className="bg-surface border-border p-6">
                    <div className="text-sm text-muted mb-2">Agendamentos</div>
                    <div className="text-4xl font-bold text-foreground mb-1">{upcomingAppointments.length}</div>
                    <div className="text-xs text-muted">Próximos 30 dias</div>
                </Card>

                <Card className="bg-surface border-border p-6">
                    <div className="text-sm text-muted mb-2">Consultorias IA</div>
                    <div className="text-4xl font-bold text-foreground mb-1">12</div>
                    <div className="text-xs text-muted">Este mês</div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-foreground">Próximos Agendamentos</h2>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-foreground-inverse text-sm">
                                Ver Todos
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {upcomingAppointments.map(apt => (
                                <Card key={apt.id} className="bg-surface border-border p-6 hover:border-primary/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">{apt.service}</h3>
                                            <p className="text-muted text-sm">{apt.salon}</p>
                                            <p className="text-muted text-sm">com {apt.professional}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#D4AF37] font-bold text-xl">R$ {apt.price}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted mb-4">
                                        <span>📅 {new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                                        <span>🕐 {apt.time}</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="flex-1 border-border text-foreground-secondary hover:bg-surface-hover text-sm">
                                            Reagendar
                                        </Button>
                                        <Button className="flex-1 bg-primary text-foreground-inverse hover:bg-primary-hover text-sm">
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recent AI Recommendations */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Recomendações Recentes da IA</h2>
                        <div className="space-y-3">
                            {recentRecommendations.map(rec => (
                                <Card key={rec.id} className="bg-surface border-border p-5 hover:border-primary/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                                            🤖
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-xs text-[#D4AF37] uppercase font-bold">{rec.type}</span>
                                                    <h4 className="text-white font-medium">{rec.description}</h4>
                                                </div>
                                                <span className="text-xs text-gray-600">{new Date(rec.date).toLocaleDateString('pt-BR')}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">Por {rec.agent}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Quick Actions */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#050505] border-[#D4AF37] p-6">
                        <h3 className="text-white font-bold mb-4">Ações Rápidas</h3>
                        <div className="space-y-3">
                            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#F2D06B] justify-start">
                                🗓️ Novo Agendamento
                            </Button>
                            <Button variant="outline" className="w-full border-[#333] text-gray-300 hover:bg-gray-800 justify-start">
                                💬 Consultoria IA
                            </Button>
                            <Button variant="outline" className="w-full border-[#333] text-gray-300 hover:bg-gray-800 justify-start">
                                🛍️ Ir para Loja
                            </Button>
                            <Button variant="outline" className="w-full border-[#333] text-gray-300 hover:bg-gray-800 justify-start">
                                🎁 Resgatar Pontos
                            </Button>
                        </div>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <h3 className="text-white font-bold mb-4">Seu Plano</h3>
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">✨</span>
                                <span className="text-[#D4AF37] font-bold text-lg">Alsham Prime</span>
                            </div>
                            <p className="text-sm text-gray-500">Renovação: 15/12/2025</p>
                        </div>
                        <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-sm">
                            Gerenciar Assinatura
                        </Button>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <h3 className="text-white font-bold mb-3">Tendências para Você</h3>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                <div>
                                    <p className="text-sm text-white font-medium">Balayage Sunset</p>
                                    <p className="text-xs text-gray-500">Trending agora</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                                <div>
                                    <p className="text-sm text-white font-medium">Corte Mullet 2.0</p>
                                    <p className="text-xs text-gray-500">Alta demanda</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
