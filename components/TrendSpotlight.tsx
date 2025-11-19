
import React, { useState, useEffect } from 'react';
import { Trend } from '../types';

// Mock Data expandido com tendências femininas para equilíbrio (IMAGENS CORRIGIDAS)
const trends: Trend[] = [
    {
        id: 't1',
        title: "Platinum Blonde Era",
        celebrityRef: "Inspirado em Kim Kardashian & Beyoncé",
        description: "A tendência 2025/26 para coloração global. Platinado frio com raiz esfumada.",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: Global Bleach & Tone",
        targetProfessional: 'colorista_x0',
        promptContext: "I want a platinum blonde transformation with shadowed roots, inspired by modern pop divas."
    },
    {
        id: 't2',
        title: "The 'Old Money' Aesthetic",
        celebrityRef: "Inspirado em Henry Cavill",
        description: "O retorno da elegância clássica masculina. Cortes tesoura, acabamento natural e brilho saudável.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: Classic Taper Cut",
        targetProfessional: 'mens_style',
        promptContext: "I want a classic 'Old Money' gentleman haircut, scissor cut sides, natural finish, inspired by Henry Cavill."
    },
    {
        id: 't3',
        title: "Glazed Donut Nails",
        celebrityRef: "Inspirado em Hailey Bieber",
        description: "O acabamento perolado cromado que dominou as redes sociais. Minimalista e luxuoso.",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: Chrome Powder Finish",
        targetProfessional: 'nail_artist_x0',
        promptContext: "I want 'Glazed Donut' nails, pearly chrome finish, almond shape, inspired by Hailey Bieber."
    },
    {
        id: 't4',
        title: "Butterfly Haircut",
        celebrityRef: "Inspirado em Matilda Djerf",
        description: "Camadas volumosas e movimento anos 90. O corte viral do TikTok para volume máximo.",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: 90s Blowout Layers",
        targetProfessional: 'cabeleireira_x0',
        promptContext: "I want a Butterfly Haircut, heavy face-framing layers, 90s blowout style, voluminous."
    },
    {
        id: 't5',
        title: "Viking Warrior Beard",
        celebrityRef: "Inspirado em Jason Momoa",
        description: "Volume controlado, linhas naturais e hidratação extrema. O masculino rústico refinado.",
        image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: Beard Sculpting 3D",
        targetProfessional: 'beard_expert',
        promptContext: "I want a full 'Viking' beard style, well-groomed but voluminous, similar to Jason Momoa."
    },
    {
        id: 't6',
        title: "Fox Eyes Lifting",
        celebrityRef: "Inspirado em Bella Hadid",
        description: "Extensão de cílios com efeito lifting no canto externo para um olhar penetrante.",
        image: "https://images.unsplash.com/photo-1587776536140-0f329b3926a9?auto=format&fit=crop&w=1200&q=80",
        signature: "Assinatura: L-Curl Mapping",
        targetProfessional: 'lash_expert',
        promptContext: "I want 'Fox Eyes' eyelash extensions, winged effect on outer corners, lifting effect."
    }
];

interface TrendSpotlightProps {
    onSelectTrend: (trend: Trend) => void;
}

const TrendSpotlight: React.FC<TrendSpotlightProps> = ({ onSelectTrend }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trends.length);
        }, 5000); // Muda a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    const activeTrend = trends[currentIndex];

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert(`🔥 Tendência "${activeTrend.title}" copiada para área de transferência para postar no TikTok!`);
    }

    return (
        <div style={{ marginBottom: '60px', position: 'relative' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', padding: '0 10px' }}>
                <div>
                    <h2 style={{ color: '#D4AF37', margin: 0, fontSize: '1.5em', letterSpacing: '2px', textTransform: 'uppercase' }}>Alsham Trend Radar™</h2>
                    <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '0.9em' }}>Monitoramento Global de Estilo em Tempo Real</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <div style={{ display: 'flex', gap: '5px' }}>
                         {trends.map((_, idx) => (
                             <div key={idx} style={{ 
                                 width: '30px', 
                                 height: '3px', 
                                 background: idx === currentIndex ? '#F00' : '#333',
                                 transition: 'background 0.3s'
                             }}></div>
                         ))}
                     </div>
                     <span style={{ color: '#F0F0F0', fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '10px' }}>Live Updates</span>
                </div>
            </div>

            {/* CARROSEL HERO */}
            <div 
                onClick={() => onSelectTrend(activeTrend)}
                style={{
                    width: '100%',
                    height: '500px',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid #333',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}
            >
                {/* Imagem com Animação de Fade */}
                <div 
                    key={activeTrend.id} // Key força o re-render para animação
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: `url(${activeTrend.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        animation: 'zoomFade 5s infinite alternate'
                    }}
                ></div>
                <style>{`
                    @keyframes zoomFade {
                        0% { transform: scale(1); }
                        100% { transform: scale(1.05); }
                    }
                `}</style>

                {/* Gradient Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}></div>

                {/* Content */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    top: 0,
                    width: '50%',
                    padding: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 2
                }}>
                     <div style={{ 
                         display: 'inline-block',
                         background: '#F00', 
                         color: '#FFF', 
                         padding: '5px 10px', 
                         fontSize: '0.7em', 
                         fontWeight: 'bold', 
                         textTransform: 'uppercase', 
                         letterSpacing: '1px',
                         marginBottom: '20px',
                         width: 'fit-content',
                         borderRadius: '2px'
                     }}>
                         Trending Now
                     </div>

                    <div style={{ color: '#D4AF37', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: 'bold' }}>
                        {activeTrend.celebrityRef}
                    </div>
                    
                    <h3 style={{ 
                        color: '#FFF', 
                        margin: '0 0 20px 0', 
                        fontSize: '3em', 
                        fontFamily: 'Cinzel, serif',
                        lineHeight: '1.1',
                        textShadow: '0 5px 15px rgba(0,0,0,0.5)'
                    }}>{activeTrend.title}</h3>
                    
                    <p style={{ 
                        color: '#CCC', 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        marginBottom: '30px', 
                        maxWidth: '500px', 
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 300
                    }}>
                        {activeTrend.description}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ color: '#888', fontSize: '0.9em', fontStyle: 'italic', borderLeft: '2px solid #D4AF37', paddingLeft: '15px' }}>
                            {activeTrend.signature}
                        </span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{
                                padding: '15px 30px',
                                background: '#D4AF37',
                                color: '#000',
                                border: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>
                                Quero este visual
                            </button>
                            <button onClick={handleShare} style={{
                                padding: '15px',
                                background: 'rgba(255,255,255,0.1)',
                                color: '#FFF',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1.2em',
                                transition: 'background 0.3s'
                            }}>
                                ↗
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendSpotlight;
