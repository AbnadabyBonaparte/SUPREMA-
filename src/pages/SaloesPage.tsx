// src/pages/SaloesPage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Salon, RealProfessional, Service } from '@/types/ai';

// Mock salons data
const mockSalons: Salon[] = [
    {
        id: '1',
        name: "Barbearia Viking Prime",
        image: "https://images.unsplash.com/photo-1503951914875-452162b7f300?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 128,
        distance: "1.2 km",
        address: "Av. Paulista, 1000 - Jardins",
        isVerified: true,
        professionals: [
            {
                id: 'p1', name: "Ragnar Lopes", role: "Master Barber", rating: 5.0,
                avatar: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=200&q=80",
                services: [
                    { id: 's1', name: "Corte Viking", price: 80, duration: "45 min" },
                    { id: 's2', name: "Barba Terapia", price: 60, duration: "30 min" }
                ]
            },
            {
                id: 'p2', name: "Bjorn Silva", role: "Barber", rating: 4.8,
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
                services: [{ id: 's3', name: "Corte Clássico", price: 60, duration: "40 min" }]
            }
        ]
    },
    {
        id: '2',
        name: "Studio Elegance Femme",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 342,
        distance: "2.5 km",
        address: "Rua Oscar Freire, 500",
        isVerified: true,
        professionals: [
            {
                id: 'p3', name: "Ana Marie", role: "Colorista", rating: 4.9,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
                services: [
                    { id: 's4', name: "Mechas Californianas", price: 450, duration: "120 min" },
                    { id: 's5', name: "Hidratação Profunda", price: 150, duration: "60 min" }
                ]
            }
        ]
    },
    {
        id: '3',
        name: "Ink & Art Tattoo",
        image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80",
        rating: 5.0,
        reviews: 56,
        distance: "5.0 km",
        address: "Rua Augusta, 200",
        isVerified: true,
        professionals: []
    },
    {
        id: '4',
        name: "Royal Spa & Wellness",
        image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
        rating: 5.0,
        reviews: 210,
        distance: "3.0 km",
        address: "Shopping Cidade Jardim",
        isVerified: true,
        professionals: []
    }
];

export function SaloesPage() {
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<RealProfessional | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showPayment, setShowPayment] = useState(false);

    const handleBack = () => {
        if (showPayment) { setShowPayment(false); return; }
        if (selectedService) { setSelectedService(null); return; }
        if (selectedProfessional) { setSelectedProfessional(null); return; }
        if (selectedSalon) { setSelectedSalon(null); return; }
    };

    // Payment Screen
    if (showPayment && selectedService && selectedProfessional && selectedSalon) {
        return (
            <div className="py-10 max-w-2xl mx-auto">
                <button
                    onClick={handleBack}
                    className="mb-6 text-gray-400 hover:text-white transition-colors"
                >
                    ← Voltar
                </button>

                <Card className="bg-white text-black p-8">
                    <h2 className="text-2xl font-bold mb-6">Checkout Seguro</h2>

                    {/* Order Summary */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <div className="font-bold text-lg">{selectedService.name}</div>
                        <div className="text-sm text-gray-600">com {selectedProfessional.name} em {selectedSalon.name}</div>
                        <div className="flex justify-between mt-3 text-xl font-bold text-[#D4AF37]">
                            <span>Total</span>
                            <span>R$ {selectedService.price},00</span>
                        </div>
                    </div>

                    {/* Premium Plan Nudge */}
                    <div className="border-2 border-[#D4AF37] rounded-lg p-5 mb-6 bg-[#D4AF37]/10">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold">Plano Alsham Premium</h3>
                            <span className="bg-[#D4AF37] text-black px-2 py-1 rounded text-xs font-bold">RECOMENDADO</span>
                        </div>
                        <ul className="text-sm space-y-1 mb-4 list-disc list-inside">
                            <li>Consultoria AI Ilimitada</li>
                            <li>10% de Desconto em todos os serviços</li>
                            <li>Isenção da taxa de conveniência</li>
                        </ul>
                        <Button className="w-full bg-black text-[#D4AF37] hover:bg-gray-900">
                            Assinar por R$ 39,90/mês
                        </Button>
                        <div className="text-center text-xs mt-2 text-gray-600">
                            e pague apenas R$ {(selectedService.price * 0.9).toFixed(2)} hoje!
                        </div>
                    </div>

                    {/* Pay Button */}
                    <Button
                        onClick={() => alert('Pagamento Processado! Agendamento Confirmado.')}
                        className="w-full bg-gray-200 text-black hover:bg-gray-300 font-bold"
                        size="lg"
                    >
                        Pagar Avulso R$ {selectedService.price},00
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                        Pagamento processado via Stripe. Taxa de serviço inclusa.
                    </p>
                </Card>
            </div>
        );
    }

    // Salon Detail Screen
    if (selectedSalon) {
        return (
            <div className="py-10">
                <button
                    onClick={handleBack}
                    className="mb-6 text-gray-400 hover:text-white transition-colors"
                >
                    ← Voltar à Lista
                </button>

                {/* Hero */}
                <div className="h-64 rounded-2xl overflow-hidden relative mb-8">
                    <img src={selectedSalon.image} alt={selectedSalon.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <h1 className="text-4xl font-bold text-white mb-2">{selectedSalon.name}</h1>
                        <div className="flex gap-4 text-gray-300 text-sm">
                            <span>⭐ {selectedSalon.rating} ({selectedSalon.reviews} avaliações)</span>
                            <span>📍 {selectedSalon.address}</span>
                        </div>
                    </div>
                </div>

                {/* Professionals */}
                <h3 className="text-2xl text-[#D4AF37] border-b border-white/10 pb-3 mb-6">Profissionais Disponíveis</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {selectedSalon.professionals.length > 0 ? selectedSalon.professionals.map(pro => (
                        <Card key={pro.id} className="bg-[#1A1A1A] border-[#333] p-6">
                            <div className="flex items-center gap-4 mb-5">
                                <img
                                    src={pro.avatar}
                                    alt={pro.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
                                />
                                <div>
                                    <div className="text-white font-bold">{pro.name}</div>
                                    <div className="text-gray-500 text-sm">{pro.role}</div>
                                    <div className="text-[#D4AF37] text-sm">⭐ {pro.rating}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {pro.services.map(service => (
                                    <div key={service.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                                        <div>
                                            <div className="text-gray-200 text-sm">{service.name}</div>
                                            <div className="text-gray-600 text-xs">{service.duration}</div>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setSelectedProfessional(pro);
                                                setSelectedService(service);
                                                setShowPayment(true);
                                            }}
                                            className="bg-[#D4AF37] text-black hover:bg-[#F2D06B] font-bold text-sm"
                                        >
                                            R$ {service.price}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )) : (
                        <p className="text-gray-600">Nenhum profissional disponível no momento.</p>
                    )}
                </div>
            </div>
        );
    }

    // Salon Listing
    return (
        <div className="py-10">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-light text-foreground mb-2">AGENDE SUA TRANSFORMAÇÃO</h2>
                <p className="text-[#D4AF37] uppercase tracking-[2px] text-xs">Rede de Parceiros Credenciados Alsham</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-3">
                {['Próximos a mim', 'Melhores Avaliados', 'Barbearias', 'Salões Femininos', 'Estética'].map(filter => (
                    <button
                        key={filter}
                        className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 whitespace-nowrap hover:border-[#D4AF37]/50 transition-colors text-sm"
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Salon Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockSalons.map(salon => (
                    <Card
                        key={salon.id}
                        onClick={() => setSelectedSalon(salon)}
                        className="bg-[#121212] border-[#222] overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
                            {salon.isVerified && (
                                <span className="absolute top-3 right-3 bg-[#D4AF37] text-black px-2 py-1 rounded text-xs font-bold uppercase">
                                    Verificado
                                </span>
                            )}
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-foreground text-lg font-medium">{salon.name}</h3>
                                <span className="bg-[#1A1A1A] text-[#D4AF37] px-2 py-1 rounded text-sm">{salon.distance}</span>
                            </div>
                            <div className="text-gray-500 text-sm mb-4">{salon.address}</div>
                            <div className="flex gap-4 text-gray-400 text-sm">
                                <span>⭐ {salon.rating}</span>
                                <span>•</span>
                                <span>{salon.reviews} avaliações</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
