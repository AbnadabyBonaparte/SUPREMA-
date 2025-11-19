
import React, { useState } from 'react';
import { Salon, RealProfessional, Service } from '../types';

// --- MOCK DATA (IMAGENS DE ESTÚDIO REAIS & ESTÁVEIS PARA APRESENTAÇÃO) ---
const mockSalons: Salon[] = [
    {
        id: '1',
        name: "Barbearia Viking Prime",
        image: "https://images.unsplash.com/photo-1503951914875-452162b7f300?auto=format&fit=crop&w=800&q=80", // Dark Interior
        rating: 4.9,
        reviews: 128,
        distance: "1.2 km",
        address: "Av. Paulista, 1000 - Jardins",
        isVerified: true,
        professionals: [
            {
                id: 'p1', name: "Ragnar Lopes", role: "Master Barber", rating: 5.0, avatar: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=200&q=80",
                services: [{id: 's1', name: "Corte Viking", price: 80, duration: "45 min"}, {id: 's2', name: "Barba Terapia", price: 60, duration: "30 min"}]
            },
            {
                id: 'p2', name: "Bjorn Silva", role: "Barber", rating: 4.8, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
                services: [{id: 's3', name: "Corte Clássico", price: 60, duration: "40 min"}]
            }
        ]
    },
    {
        id: '2',
        name: "Studio Elegance Femme",
        image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80", // Luxury Salon
        rating: 4.8,
        reviews: 342,
        distance: "2.5 km",
        address: "Rua Oscar Freire, 500",
        isVerified: true,
        professionals: [
            {
                id: 'p3', name: "Ana Marie", role: "Colorista", rating: 4.9, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
                services: [{id: 's4', name: "Mechas Californianas", price: 450, duration: "120 min"}, {id: 's5', name: "Hidratação Profunda", price: 150, duration: "60 min"}]
            }
        ]
    },
    {
        id: '3',
        name: "Ink & Art Tattoo",
        image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80", // Tattoo Studio
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
        image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80", // Luxury Spa
        rating: 5.0,
        reviews: 210,
        distance: "3.0 km",
        address: "Shopping Cidade Jardim",
        isVerified: true,
        professionals: []
    }
];

const BookingSystem: React.FC = () => {
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

    // --- TELA DE PAGAMENTO (STRIPE CONCEPT) ---
    if (showPayment && selectedService && selectedProfessional && selectedSalon) {
        return (
            <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
                <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' }}>&larr; Voltar</button>
                
                <div style={{ background: '#FFF', borderRadius: '8px', padding: '30px', color: '#333' }}>
                    <h2 style={{ margin: '0 0 20px 0', fontFamily: 'Montserrat, sans-serif', color: '#000' }}>Checkout Seguro</h2>
                    
                    {/* Resumo do Pedido */}
                    <div style={{ background: '#F5F5F5', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                        <div style={{ fontWeight: 'bold' }}>{selectedService.name}</div>
                        <div style={{ fontSize: '0.9em', color: '#666' }}>com {selectedProfessional.name} em {selectedSalon.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.2em', fontWeight: 'bold', color: '#D4AF37' }}>
                            <span>Total</span>
                            <span>R$ {selectedService.price},00</span>
                        </div>
                    </div>

                    {/* PRICING NUDGE (PLANO MENSAL) */}
                    <div style={{ border: '2px solid #D4AF37', borderRadius: '8px', padding: '20px', marginBottom: '20px', background: 'rgba(212, 175, 55, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 style={{ margin: 0, color: '#000' }}>Plano Alsham Premium</h3>
                            <span style={{ background: '#D4AF37', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7em', fontWeight: 'bold' }}>RECOMENDADO</span>
                        </div>
                        <ul style={{ paddingLeft: '20px', fontSize: '0.9em', color: '#444', marginBottom: '15px' }}>
                            <li>Consultoria AI Ilimitada</li>
                            <li>10% de Desconto em todos os serviços</li>
                            <li>Isenção da taxa de conveniência</li>
                        </ul>
                        <button style={{ width: '100%', padding: '12px', background: '#000', color: '#D4AF37', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Assinar por R$ 39,90/mês
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '0.8em', marginTop: '10px', color: '#666' }}>e pague apenas R$ {(selectedService.price * 0.9).toFixed(2)} hoje!</div>
                    </div>

                    {/* Opção Avulsa */}
                    <div style={{ textAlign: 'center' }}>
                         <button style={{ width: '100%', padding: '15px', background: '#EEE', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => alert('Pagamento Processado! Agendamento Confirmado.')}>
                            Pagar Avulso R$ {selectedService.price},00
                        </button>
                        <p style={{ fontSize: '0.7em', color: '#888', marginTop: '10px' }}>Pagamento processado via Stripe. Taxa de serviço inclusa.</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- PÁGINA DO SALÃO (DETALHES) ---
    if (selectedSalon) {
        return (
            <div style={{ padding: '20px 0' }}>
                <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px' }}>&larr; Voltar à Lista</button>
                
                {/* Hero Salão */}
                <div style={{ height: '250px', borderRadius: '16px', overflow: 'hidden', position: 'relative', marginBottom: '30px' }}>
                    <img src={selectedSalon.image} alt={selectedSalon.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(transparent, #000)' }}>
                        <h1 style={{ margin: 0, color: '#F0F0F0' }}>{selectedSalon.name}</h1>
                        <div style={{ display: 'flex', gap: '15px', color: '#CCC', marginTop: '5px', fontSize: '0.9em' }}>
                            <span>⭐ {selectedSalon.rating} ({selectedSalon.reviews} avaliações)</span>
                            <span>📍 {selectedSalon.address}</span>
                        </div>
                    </div>
                </div>

                {/* Lista de Profissionais */}
                <h3 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Profissionais Disponíveis</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {selectedSalon.professionals.length > 0 ? selectedSalon.professionals.map(pro => (
                        <div key={pro.id} style={{ background: '#1A1A1A', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                <img src={pro.avatar} alt={pro.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4AF37' }} />
                                <div>
                                    <div style={{ color: '#FFF', fontWeight: 'bold' }}>{pro.name}</div>
                                    <div style={{ color: '#888', fontSize: '0.8em' }}>{pro.role}</div>
                                    <div style={{ color: '#D4AF37', fontSize: '0.8em' }}>⭐ {pro.rating}</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {pro.services.map(service => (
                                    <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px' }}>
                                        <div>
                                            <div style={{ color: '#EEE', fontSize: '0.9em' }}>{service.name}</div>
                                            <div style={{ color: '#666', fontSize: '0.8em' }}>{service.duration}</div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setSelectedProfessional(pro);
                                                setSelectedService(service);
                                                setShowPayment(true);
                                            }}
                                            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8em' }}
                                        >
                                            R$ {service.price}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <p style={{ color: '#666' }}>Nenhum profissional disponível no momento.</p>
                    )}
                </div>
            </div>
        );
    }

    // --- LISTAGEM DE SALÕES (MARKETPLACE VIEW) ---
    return (
        <div style={{ padding: '40px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2.5em', fontWeight: 400 }}>AGENDE SUA TRANSFORMAÇÃO</h2>
                <p style={{ color: '#D4AF37', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8em' }}>Rede de Parceiros Credenciados Alsham</p>
            </div>

            {/* Filtros / Busca */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
                {['Próximos a mim', 'Melhores Avaliados', 'Barbearias', 'Salões Femininos', 'Estética'].map(filter => (
                    <button key={filter} style={{
                        padding: '10px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: '#A0A0A0', cursor: 'pointer', whiteSpace: 'nowrap'
                    }}>{filter}</button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {mockSalons.map(salon => (
                    <div 
                        key={salon.id} 
                        onClick={() => setSelectedSalon(salon)}
                        style={{ 
                            background: '#121212', 
                            border: '1px solid #222', 
                            borderRadius: '12px', 
                            overflow: 'hidden', 
                            cursor: 'pointer', 
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img src={salon.image} alt={salon.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {salon.isVerified && (
                                <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#D4AF37', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7em', fontWeight: 'bold', textTransform: 'uppercase' }}>Verificado</span>
                            )}
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0, color: '#F0F0F0', fontSize: '1.2em' }}>{salon.name}</h3>
                                <span style={{ background: '#1A1A1A', color: '#D4AF37', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9em' }}>{salon.distance}</span>
                            </div>
                            <div style={{ color: '#888', fontSize: '0.9em', marginBottom: '15px' }}>{salon.address}</div>
                            <div style={{ display: 'flex', gap: '15px', color: '#A0A0A0', fontSize: '0.85em' }}>
                                <span>⭐ {salon.rating}</span>
                                <span>•</span>
                                <span>{salon.reviews} avaliações</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingSystem;
