// src/pages/ProfessionalDashboardPage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProfessionalDashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

    // Mock data
    const todayAppointments = [
        { id: 1, client: 'Maria Santos', service: 'Corte + Escova', time: '09:00', duration: '60 min', price: 120, status: 'confirmed' },
        { id: 2, client: 'Pedro Costa', service: 'Barba', time: '10:30', duration: '30 min', price: 60, status: 'confirmed' },
        { id: 3, client: 'Ana Silva', service: 'Coloração', time: '14:00', duration: '120 min', price: 350, status: 'pending' },
        { id: 4, client: 'Carlos Oliveira', service: 'Corte Masculino', time: '16:30', duration: '45 min', price: 80, status: 'confirmed' }
    ];

    const stats = {
        today: { appointments: 4, revenue: 610, completed: 2 },
        week: { appointments: 28, revenue: 4200, completed: 24 },
        month: { appointments: 112, revenue: 16800, completed: 98 }
    };

    const currentStats = stats[selectedPeriod];

    return (
        <div className="py-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-foreground mb-2">Dashboard Profissional</h1>
                    <p className="text-gray-500">Gerencie sua agenda e acompanhe seus ganhos</p>
                </div>
                <Button className="bg-[#D4AF37] text-black hover:bg-[#F2D06B]">
                    + Novo Horário
                </Button>
            </div>

            {/* Period Selector */}
            <div className="flex gap-3 mb-8">
                {[
                    { key: 'today', label: 'Hoje' },
                    { key: 'week', label: 'Esta Semana' },
                    { key: 'month', label: 'Este Mês' }
                ].map(period => (
                    <button
                        key={period.key}
                        onClick={() => setSelectedPeriod(period.key as typeof selectedPeriod)}
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedPeriod === period.key
                                ? 'bg-[#D4AF37] text-black'
                                : 'bg-[#1A1A1A] text-gray-400 border border-[#333] hover:border-[#D4AF37]/50'
                            }`}
                    >
                        {period.label}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/30 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                            💰
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Faturamento</div>
                            <div className="text-3xl font-bold text-[#D4AF37]">R$ {currentStats.revenue.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">
                        {selectedPeriod === 'today' ? 'Hoje' : selectedPeriod === 'week' ? 'Últimos 7 dias' : 'Últimos 30 dias'}
                    </div>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#333] p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">
                            📅
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Agendamentos</div>
                            <div className="text-3xl font-bold text-foreground">{currentStats.appointments}</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">{currentStats.completed} concluídos</div>
                </Card>

                <Card className="bg-[#1A1A1A] border-[#333] p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl">
                            ⭐
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Avaliação</div>
                            <div className="text-3xl font-bold text-foreground">4.9</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">128 avaliações</div>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Agenda do Dia */}
                <div className="lg:col-span-2">
                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-foreground">Agenda de Hoje</h2>
                            <span className="text-sm text-gray-500">
                                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {todayAppointments.map(apt => (
                                <div key={apt.id} className="border border-[#333] rounded-lg p-5 hover:border-[#D4AF37]/50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[#D4AF37] font-bold text-lg">{apt.time}</span>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${apt.status === 'confirmed'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-bold mb-1">{apt.client}</h4>
                                            <p className="text-gray-400 text-sm">{apt.service}</p>
                                            <p className="text-gray-600 text-xs mt-1">⏱️ {apt.duration}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#D4AF37] font-bold text-xl mb-2">R$ {apt.price}</div>
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded bg-[#333] hover:bg-[#444] text-white text-sm">
                                                    ✓
                                                </button>
                                                <button className="p-2 rounded bg-[#333] hover:bg-[#444] text-white text-sm">
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full mt-6 bg-[#D4AF37] text-black hover:bg-[#F2D06B]">
                            Ver Agenda Completa
                        </Button>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <h3 className="text-white font-bold mb-4">Estatísticas Rápidas</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Taxa de Ocupação</span>
                                <span className="text-white font-bold">87%</span>
                            </div>
                            <div className="w-full bg-[#333] rounded-full h-2">
                                <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '87%' }}></div>
                            </div>

                            <div className="flex justify-between items-center pt-3">
                                <span className="text-gray-400 text-sm">Ticket Médio</span>
                                <span className="text-white font-bold">R$ 152</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Clientes Recorrentes</span>
                                <span className="text-white font-bold">68%</span>
                            </div>
                        </div>
                    </Card>

                    {/* Top Services */}
                    <Card className="bg-[#1A1A1A] border-[#333] p-6">
                        <h3 className="text-white font-bold mb-4">Serviços Mais Vendidos</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Corte Masculino', count: 45, revenue: 3600 },
                                { name: 'Barba', count: 32, revenue: 1920 },
                                { name: 'Coloração', count: 18, revenue: 6300 }
                            ].map((service, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-[#333] last:border-0">
                                    <div>
                                        <p className="text-white text-sm font-medium">{service.name}</p>
                                        <p className="text-gray-500 text-xs">{service.count} vezes</p>
                                    </div>
                                    <span className="text-[#D4AF37] font-bold text-sm">R$ {service.revenue}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#050505] border-[#D4AF37] p-6">
                        <h3 className="text-white font-bold mb-4">Notificações</h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">🔔</span>
                                <div>
                                    <p className="text-white text-sm">Novo agendamento</p>
                                    <p className="text-gray-500 text-xs">Ana Silva - 14:00</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">⭐</span>
                                <div>
                                    <p className="text-white text-sm">Nova avaliação 5★</p>
                                    <p className="text-gray-500 text-xs">Maria Santos</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalDashboardPage;
