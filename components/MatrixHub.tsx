
import React, { useState, useEffect } from 'react';
import { ProfessionalType, ProfessionalProfile, Trend } from '../types';
import TrendSpotlight from './TrendSpotlight';
import SponsoredHero from './SponsoredHero';

interface MatrixHubProps {
    onSelect: (prof: ProfessionalType) => void;
    onSelectTrend: (trend: Trend) => void;
}

const agents: ProfessionalProfile[] = [
    // --- MASCULINO ---
    { id: 'barber_x0', category: 'Masculino', name: 'Barbeiro Supreme', title: 'Matriz Transcendental', description: 'Visagismo, cortes de precisão e arquitetura capilar masculina.', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80' },
    { id: 'grooming_master', category: 'Masculino', name: 'Grooming Master', title: 'Cuidados da Pele & Rotina', description: 'Skincare masculino avançado e protocolos anti-aging.', image: 'https://images.unsplash.com/photo-1616091093747-4d8c83485906?auto=format&fit=crop&w=800&q=80' },
    { id: 'beard_expert', category: 'Masculino', name: 'Beard Expert', title: 'Design de Barba', description: 'Otimização de crescimento, densidade e modelagem 3D.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { id: 'mens_style', category: 'Masculino', name: 'Men\'s Style', title: 'Consultoria de Imagem', description: 'Styling completo, guarda-roupa e branding pessoal.', image: 'https://images.unsplash.com/photo-1534030347209-7147fd69a3f2?auto=format&fit=crop&w=800&q=80' },

    // --- FEMININO ---
    { id: 'cabeleireira_x0', category: 'Feminino', name: 'Cabeleireira X.0', title: 'Hair Design Feminino', description: 'Cortes, tratamentos e saúde capilar profunda.', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80' },
    { id: 'colorista_x0', category: 'Feminino', name: 'Colorista X.0', title: 'Colorimetria Avançada', description: 'Análise de subtom, mechas e coloração artística.', image: 'https://images.unsplash.com/photo-1624525402391-747d80d74a9c?auto=format&fit=crop&w=800&q=80' },
    { id: 'hair_stylist_x0', category: 'Feminino', name: 'Hair Stylist', title: 'Penteados Exclusivos', description: 'Styling para eventos, gala e produções artísticas.', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80' },

    // --- MAKE & ESTÉTICA ---
    { id: 'makeup_artist_x0', category: 'Estética', name: 'Makeup Artist', title: 'Maquiagem Profissional', description: 'Técnicas de celebridades, visagismo e contouring.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80' },
    { id: 'beauty_guru', category: 'Estética', name: 'Beauty Guru', title: 'Beleza Integral', description: 'Curadoria de produtos e rotinas de beleza holística.', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80' },
    { id: 'skincare_expert', category: 'Estética', name: 'Skincare Expert', title: 'Dermocosmética', description: 'Tratamentos faciais clínicos e análise de pele AI.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },

    // --- CORPO ---
    { id: 'bronze_master', category: 'Corpo', name: 'Bronze Master', title: 'Tanning Specialist', description: 'Bronzeamento artificial perfeito e health glow.', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80' },
    { id: 'body_sculptor', category: 'Corpo', name: 'Body Sculptor', title: 'Modelagem Corporal', description: 'Protocolos de contorno corporal e bem-estar físico.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
    { id: 'spa_therapist', category: 'Corpo', name: 'Spa Therapist', title: 'Wellness & Relax', description: 'Terapias de spa, massagem e reequilíbrio energético.', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },

    // --- UNHAS & DETALHES ---
    { id: 'nail_artist_x0', category: 'Detalhes', name: 'Nail Artist', title: 'Designer de Unhas', description: 'Nail art, saúde das unhas e tendências de manicure.', image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?auto=format&fit=crop&w=800&q=80' },
    { id: 'lash_expert', category: 'Detalhes', name: 'Lash Expert', title: 'Extensão de Cílios', description: 'Mapping de cílios, lifting e realce do olhar.', image: 'https://images.unsplash.com/photo-1587776536140-0f329b3926a9?auto=format&fit=crop&w=800&q=80' },
    { id: 'brow_designer', category: 'Detalhes', name: 'Brow Designer', title: 'Arquitetura de Sobrancelhas', description: 'Design, microblading e simetria facial (Phi).', image: 'https://images.unsplash.com/photo-1588513874459-663346923e4a?auto=format&fit=crop&w=800&q=80' },

    // --- AVANÇADO ---
    { id: 'tattoo_artist', category: 'Avançado', name: 'Tattoo Artist', title: 'Body Art Premium', description: 'Design de tatuagem exclusivo e simulação de placement.', image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80' },
    { id: 'piercing_master', category: 'Avançado', name: 'Piercing Master', title: 'Joalheria Corporal', description: 'Curadoria de joias, anatomia e segurança.', image: 'https://images.unsplash.com/photo-1626146629736-230227d44858?auto=format&fit=crop&w=800&q=80' },
    { id: 'aesthetic_doctor', category: 'Avançado', name: 'Aesthetic Doctor', title: 'Biomedicina Estética', description: 'Harmonização facial e procedimentos não-invasivos.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80' },
];

// Atualizado para ter "Destaques" primeiro
const categories = ['Destaques', 'Masculino', 'Feminino', 'Estética', 'Corpo', 'Detalhes', 'Avançado'];

const MatrixHub: React.FC<MatrixHubProps> = ({ onSelect, onSelectTrend }) => {
    const [activeCategory, setActiveCategory] = useState('Destaques');
    const [filteredAgents, setFilteredAgents] = useState<ProfessionalProfile[]>([]);

    useEffect(() => {
        if (activeCategory === 'Destaques') {
            // Mix Estratégico (Pareto: 80% Feminino / 20% Masculino)
            const bestSellersIds = [
                'cabeleireira_x0', // Top 1 Revenue
                'makeup_artist_x0', // High volume
                'barber_x0', // Core Brand
                'skincare_expert', // High ticket
                'nail_artist_x0', // High frequency
                'body_sculptor' // High ticket
            ];
            
            const highlights = agents.filter(a => bestSellersIds.includes(a.id));
            // Ordenar para garantir mix visual
            highlights.sort((a, b) => bestSellersIds.indexOf(a.id) - bestSellersIds.indexOf(b.id));
            setFilteredAgents(highlights);
        } else {
            setFilteredAgents(agents.filter(agent => agent.category === activeCategory));
        }
    }, [activeCategory]);

    return (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
            {/* SPONSORED HERO (ADS PREMIUM) */}
            <SponsoredHero />

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ 
                    color: '#F0F0F0', 
                    fontSize: '2.8em', 
                    marginBottom: '10px',
                    fontWeight: 400,
                    letterSpacing: '2px'
                }}>ECOSSISTEMA BEAUTY X.0</h2>
                <p style={{ 
                    color: '#D4AF37', 
                    fontFamily: 'Montserrat, sans-serif', 
                    fontSize: '1em',
                    maxWidth: '700px',
                    margin: '0 auto',
                    textTransform: 'uppercase',
                    letterSpacing: '3px'
                }}>
                    A Solução Suprema com 18 Agentes Especializados
                </p>
            </div>

            {/* TREND SPOTLIGHT */}
            <TrendSpotlight onSelectTrend={onSelectTrend} />

            {/* CATEGORY TABS */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap', 
                gap: '10px', 
                marginBottom: '40px' 
            }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            background: activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                            color: activeCategory === cat ? '#050505' : '#A0A0A0',
                            border: activeCategory === cat ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                            padding: '12px 25px',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: activeCategory === cat ? 600 : 400,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.85em',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* AGENT GRID */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '30px',
                animation: 'fadeIn 0.5s ease-in-out'
            }}>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
                {filteredAgents.map((agent) => (
                    <div 
                        key={agent.id} 
                        onClick={() => onSelect(agent.id)}
                        style={{
                            position: 'relative',
                            height: '450px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.5s ease',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
                            e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.5)';
                            (e.currentTarget.querySelector('.bg-img') as HTMLElement).style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                            (e.currentTarget.querySelector('.bg-img') as HTMLElement).style.transform = 'scale(1.0)';
                        }}
                    >
                        {/* Background Image */}
                        <div className="bg-img" style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url(${agent.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }}></div>

                        {/* Gradient Overlay */}
                        <div className="overlay" style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%)',
                        }}></div>

                        {/* Content */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '30px',
                            textAlign: 'left',
                            zIndex: 2
                        }}>
                            <div style={{ color: '#D4AF37', fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>
                                {agent.title}
                            </div>
                            <h3 style={{ 
                                color: '#F0F0F0', 
                                margin: '0 0 15px 0', 
                                fontSize: '1.8em',
                                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                            }}>{agent.name}</h3>
                            
                            <p style={{ 
                                color: '#CCC', 
                                fontSize: '0.9em', 
                                fontFamily: 'Montserrat, sans-serif',
                                marginBottom: '25px',
                                fontWeight: 300,
                                lineHeight: '1.6'
                            }}>{agent.description}</p>
                            
                            <div style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: '1px solid rgba(212, 175, 55, 0.5)',
                                padding: '10px 20px',
                                color: '#D4AF37',
                                fontSize: '0.75em',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                borderRadius: '2px',
                                background: 'rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                Acessar Inteligência
                                <span style={{ fontSize: '1.2em' }}>&rarr;</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatrixHub;
