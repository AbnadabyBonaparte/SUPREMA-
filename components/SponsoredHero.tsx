
import React from 'react';

const SponsoredHero: React.FC = () => {
    return (
        <div style={{ 
            width: '100%', 
            height: '400px', 
            borderRadius: '16px', 
            position: 'relative', 
            overflow: 'hidden', 
            marginBottom: '50px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
            {/* Vídeo ou Imagem de Fundo (Simulado - URL Estável) */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1600609842388-3e2641d7dc29?auto=format&fit=crop&w=1200&q=80")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                filter: 'brightness(0.7)',
                transition: 'transform 10s ease',
                animation: 'slowZoom 20s infinite alternate'
            }}></div>
            <style>{`
                @keyframes slowZoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
            `}</style>

            {/* Overlay Gradiente */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
            }}></div>

            {/* Tag de Patrocinado */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                padding: '5px 12px',
                borderRadius: '4px',
                color: '#F0F0F0',
                fontSize: '0.65em',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                Brand Spotlight
            </div>

            {/* Conteúdo Editorial */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '50px',
                maxWidth: '600px',
                zIndex: 2
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ width: '40px', height: '1px', background: '#D4AF37' }}></div>
                    <span style={{ color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8em', fontWeight: 600 }}>
                        Parceria Exclusiva • L'Oréal Pro
                    </span>
                </div>
                
                <h1 style={{ 
                    color: '#FFF', 
                    fontSize: '3em', 
                    margin: '0 0 20px 0', 
                    fontFamily: 'Cinzel, serif',
                    lineHeight: '1.1',
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                }}>
                    A REVOLUÇÃO DO<br/>
                    <span style={{ fontStyle: 'italic', color: '#F0F0F0' }}>METAL DETOX</span>
                </h1>
                
                <p style={{ 
                    color: '#CCC', 
                    fontSize: '1.1em', 
                    fontFamily: 'Montserrat, sans-serif', 
                    lineHeight: '1.6', 
                    marginBottom: '30px',
                    fontWeight: 300 
                }}>
                    Neutralize o metal dentro da fibra capilar e proteja a vibração da cor. 
                    Disponível agora nos salões credenciados Alsham Black.
                </p>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button style={{
                        padding: '15px 35px',
                        backgroundColor: '#D4AF37',
                        color: '#050505',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)'
                    }}>
                        Agendar Experiência
                    </button>
                    <button style={{
                        padding: '15px 35px',
                        backgroundColor: 'transparent',
                        color: '#FFF',
                        border: '1px solid rgba(255,255,255,0.3)',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        backdropFilter: 'blur(5px)'
                    }}>
                        Ver Produtos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SponsoredHero;
