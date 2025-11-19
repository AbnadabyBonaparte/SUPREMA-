
import React, { useState, useEffect } from 'react';
import { getAuraInsight } from '../services/geminiService';

interface GlobalAssistantProps {
    currentPage: string;
    onNavigate: (page: any) => void;
}

const GlobalAssistant: React.FC<GlobalAssistantProps> = ({ currentPage, onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<string>("AURA Online. Analisando padrões...");
    const [isThinking, setIsThinking] = useState(false);

    // Context Map para Atalhos Rápidos
    const contextActions: Record<string, { label: string; action: string }[]> = {
        'home': [
            { label: 'Ver Tendências', action: 'home' }, // Scroll to trend
            { label: 'Meus Pontos', action: 'loyalty' },
            { label: 'Ajuda', action: 'chat' }
        ],
        'consultant': [
            { label: 'Abrir Câmera', action: 'camera_trigger' }, // Conceptual trigger
            { label: 'Ver Inspirações', action: 'home' },
            { label: 'Agendar', action: 'booking' }
        ],
        'studio': [
            { label: 'Criar Vídeo', action: 'studio' },
            { label: 'Editar Foto', action: 'studio' },
            { label: 'Galeria', action: 'studio' }
        ],
        'booking': [
            { label: 'Perto de Mim', action: 'booking' },
            { label: 'Melhor Avaliados', action: 'booking' },
            { label: 'Falar com Suporte', action: 'chat' }
        ],
        'shop': [
            { label: 'Ver Promoções', action: 'shop' },
            { label: 'Produtos de Cabelo', action: 'shop' },
            { label: 'Wellness & Chás', action: 'shop' }
        ]
    };

    // Efeito quando a página muda: AURA "pensa" e dá uma dica
    useEffect(() => {
        const fetchInsight = async () => {
            setIsThinking(true);
            // Pequeno delay para simular processamento cognitivo e não ser intrusivo demais
            await new Promise(r => setTimeout(r, 1500));
            
            // Fallback de mensagens rápidas para UI responsiva
            let quickMsg = "Estou aqui para ajudar.";
            if (currentPage === 'home') quickMsg = "Bem-vindo ao Hub. Selecione um Agente.";
            if (currentPage === 'consultant') quickMsg = "Lembre-se: Fotos claras = Melhores resultados.";
            if (currentPage === 'studio') quickMsg = "O motor Imagen 4 está pronto para criar.";
            if (currentPage === 'booking') quickMsg = "Filtrando os melhores profissionais...";
            if (currentPage === 'shop') quickMsg = "Descubra nossa nova linha de nutrição e bem-estar.";
            
            setMessage(quickMsg);
            setIsThinking(false);
            
            // Opcional: Chamar API Real para "Insight Profundo" se o usuário abrir o menu
        };

        fetchInsight();
    }, [currentPage]);

    const handleOrbClick = async () => {
        if (!isOpen) {
            // Ao abrir, pede um insight real da IA se ainda não tiver um customizado
            setIsThinking(true);
            try {
                const insight = await getAuraInsight(currentPage);
                setMessage(insight);
            } catch (e) {
                // Fallback silencioso
            } finally {
                setIsThinking(false);
            }
        }
        setIsOpen(!isOpen);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            fontFamily: 'Montserrat, sans-serif'
        }}>
            {/* MENU DA AURA (EXPANDIDO) */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '0',
                    width: '280px',
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    padding: '20px',
                    animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                    <style>{`
                        @keyframes slideUp {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFCC', boxShadow: '0 0 10px #00FFCC' }}></div>
                        <span style={{ color: '#D4AF37', fontSize: '0.8em', fontWeight: 'bold', letterSpacing: '2px' }}>AURA SYSTEM</span>
                    </div>

                    <p style={{ color: '#E0E0E0', fontSize: '0.9em', lineHeight: '1.5', marginBottom: '20px', minHeight: '40px' }}>
                        {isThinking ? (
                            <span style={{ fontStyle: 'italic', color: '#888' }}>Processando contexto neural...</span>
                        ) : (
                            message
                        )}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '0.7em', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Sugestões para agora:</span>
                        {(contextActions[currentPage] || contextActions['home']).map((action, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    if (action.action !== 'camera_trigger') {
                                        onNavigate(action.action);
                                        setIsOpen(false);
                                    }
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#D4AF37',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '0.85em',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                {action.label}
                                <span>&rarr;</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* O ORBE (BOTÃO FLUTUANTE) */}
            <div 
                onClick={handleOrbClick}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #444, #000)',
                    border: '2px solid #D4AF37',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {/* Núcleo de Energia */}
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isThinking ? '#00FFCC' : '#D4AF37',
                    boxShadow: isThinking ? '0 0 20px #00FFCC' : '0 0 15px #D4AF37',
                    animation: 'pulse 2s infinite ease-in-out'
                }}></div>
                
                {/* Anéis Giratórios (CSS Puro) */}
                <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: '2px solid transparent',
                    borderTop: '2px solid rgba(212, 175, 55, 0.6)',
                    borderRight: '2px solid rgba(212, 175, 55, 0.6)',
                    animation: 'spin 3s linear infinite'
                }}></div>
                 <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    borderRadius: '50%',
                    border: '1px solid transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    animation: 'spinReverse 5s linear infinite'
                }}></div>

                <style>{`
                    @keyframes pulse {
                        0% { transform: scale(0.8); opacity: 0.7; }
                        50% { transform: scale(1.2); opacity: 1; }
                        100% { transform: scale(0.8); opacity: 0.7; }
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes spinReverse {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                `}</style>
            </div>
            
            {/* Label Flutuante (Tooltip) */}
            {!isOpen && (
                <div style={{
                    position: 'absolute',
                    right: '80px',
                    top: '15px',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    color: '#D4AF37',
                    fontSize: '0.7em',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    opacity: 0,
                    animation: 'fadeInOut 4s infinite',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    AURA Online
                </div>
            )}
            <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateX(10px); }
                    10%, 90% { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default GlobalAssistant;
