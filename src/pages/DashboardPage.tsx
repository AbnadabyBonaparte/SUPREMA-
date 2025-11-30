// src/pages/DashboardPage.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DashboardPage() {
    // Mock data
    const upcomingAppointments = [
        { id: 1, service: 'Corte + Barba', professional: 'Ragnar Lopes', salon: 'Barbearia Viking Prime', date: '2025-12-02', time: '14:00', price: 140 },
        { id: 2, service: 'Mechas Californianas', professional: 'Ana Marie', salon: 'Studio Elegance Femme', date: '2025-12-05', time: '10:00', price: 450 }
    ];

    const recentRecommendations = [
        { id: 1, type: 'Corte', description: 'Undercut moderno com degradê alto', agent: 'Barber X.0', date: '2025-11-28' },
        { id: 2, type: 'Produto', description: 'Pomada Efeito Matte para fixação forte', agent: 'Product Specialist', date: '2025-11-25' }
    ];

    const loyaltyPoints = 2450;
    const nextTierPoints = 3000;
    const progressPercent = (loyaltyPoints / nextTierPoints) * 100;

    return (
        <div className="py-10">
            {/* Welcome Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif text-foreground mb-2">Bem-vindo de volta! 👋</h1>
                <p className="text-gray-500">Aqui está um resumo da sua jornada Alsham</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/30 p-6">
                    <div className="text-sm text-gray-400 mb-2">Pontos Supreme</div>
                    <div className="text-4xl font-bold text-[#D4AF37] mb-3">{loyaltyPoints.toLocaleString()}</div>
                    <div className="w-full bg-black/30 rounded-full h-2 mb-2">
                        <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500">{Math.round(progressPercent)}% para Status Ouro</div>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#333] p-6">
                    <div className="text-sm text-gray-400 mb-2">Agendamentos</div>
                    <div className="text-4xl font-bold text-foreground mb-1">{upcomingAppointments.length}</div>
                    <div className="text-xs text-gray-500">Próximos 30 dias</div>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#333] p-6">
                    <div className="text-sm text-gray-400 mb-2">Consultorias IA</div>
                    <div className="text-4xl font-bold text-foreground mb-1">12</div>
                    <div className="text-xs text-gray-500">Este mês</div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-foreground">Próximos Agendamentos</h2>
                            <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-sm">
                                Ver Todos
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {upcomingAppointments.map(apt => (
                                <Card key={apt.id} className="bg-[#1A1A1A] border-[#333] p-6 hover:border-[#D4AF37]/50 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">{apt.service}</h3>
                                            <p className="text-gray-500 text-sm">{apt.salon}</p>
                                            <p className="text-gray-600 text-sm">com {apt.professional}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#D4AF37] font-bold text-xl">R$ {apt.price}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                        <span>📅 {new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                                        <span>🕐 {apt.time}</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 text-sm">
                                            Reagendar
                                        </Button>
                                        <Button className="flex-1 bg-[#D4AF37] text-black hover:bg-[#F2D06B] text-sm">
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
                                <Card key={rec.id} className="bg-[#1A1A1A] border-[#333] p-5 hover:border-[#D4AF37]/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
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
