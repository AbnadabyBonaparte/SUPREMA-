import React, { useState, useEffect } from 'react';
import { getAuraInsight } from '@/services/ai/geminiService';
import { useLocation, useNavigate } from 'react-router-dom';

const contextActions: Record<string, { label: string; action: string }[]> = {
    'home': [
        { label: 'Ver Tendências', action: 'home' },
        { label: 'Meus Pontos', action: 'loyalty' },
        { label: 'Ajuda', action: 'chat' }
    ],
    'consultant': [
        { label: 'Abrir Câmera', action: 'camera_trigger' },
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

export function GlobalAssistant() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<string>("AURA Online. Analisando padrões...");
    const [isThinking, setIsThinking] = useState(false);

    const currentPage = (() => {
        if (location.pathname.startsWith('/shop')) return 'shop';
        if (location.pathname.startsWith('/saloes')) return 'booking';
        if (location.pathname.startsWith('/creator-suite')) return 'studio';
        if (location.pathname.startsWith('/dashboard')) return 'consultant';
        return 'home';
    })();

    const navigateToAction = (action: string) => {
        const actionMap: Record<string, string> = {
            home: '/',
            loyalty: '/fidelidade',
            booking: '/saloes',
            shop: '/shop',
            chat: '/dashboard',
            studio: '/creator-suite'
        };

        const target = actionMap[action] || '/';
        navigate(target);
    };

    // Update message when page changes
    useEffect(() => {
        const fetchInsight = async () => {
            setIsThinking(true);
            await new Promise(r => setTimeout(r, 1500));

            let quickMsg = "Estou aqui para ajudar.";
            if (currentPage === 'home') quickMsg = "Bem-vindo ao Hub. Selecione um Agente.";
            if (currentPage === 'consultant') quickMsg = "Lembre-se: Fotos claras = Melhores resultados.";
            if (currentPage === 'studio') quickMsg = "O motor Imagen 4 está pronto para criar.";
            if (currentPage === 'booking') quickMsg = "Filtrando os melhores profissionais...";
            if (currentPage === 'shop') quickMsg = "Descubra nossa nova linha de nutrição e bem-estar.";

            setMessage(quickMsg);
            setIsThinking(false);
        };

        fetchInsight();
    }, [currentPage]);

    const handleOrbClick = async () => {
        if (!isOpen) {
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
        <div className="fixed bottom-8 right-8 z-50">
            {/* AURA Menu (Expanded) */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-72 bg-black/95 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/30 shadow-2xl p-5 animate-slideUp">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00FFCC]"></div>
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[2px]">AURA SYSTEM</span>
                    </div>

                    {/* Message */}
                    <p className="text-gray-200 text-sm leading-relaxed mb-5 min-h-[40px]">
                        {isThinking ? (
                            <span className="italic text-gray-500">Processando contexto neural...</span>
                        ) : (
                            message
                        )}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <span className="text-xs text-gray-600 uppercase tracking-wider">Sugestões para agora:</span>
                        {(contextActions[currentPage] || contextActions['home']).map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (action.action !== 'camera_trigger') {
                                        navigateToAction(action.action);
                                        setIsOpen(false);
                                    }
                                }}
                                className="w-full flex items-center justify-between px-3 py-2.5 bg-white/5 border border-white/10 text-[#D4AF37] rounded-lg text-sm hover:bg-[#D4AF37]/10 transition-colors"
                            >
                                {action.label}
                                <span>→</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* The Orb (Floating Button) */}
            <div
                onClick={handleOrbClick}
                className="w-16 h-16 rounded-full bg-gradient-radial from-gray-700 to-black border-2 border-[#D4AF37] cursor-pointer relative shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform flex items-center justify-center group"
            >
                {/* Energy Core */}
                <div className={`w-5 h-5 rounded-full ${isThinking ? 'bg-cyan-400 shadow-[0_0_20px_#00FFCC]' : 'bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]'} animate-pulse`}></div>

                {/* Rotating Rings */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-[#D4AF37]/60 border-r-[#D4AF37]/60 animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-[-10px] rounded-full border border-transparent border-b-white/30 animate-spin-reverse" style={{ animationDuration: '5s' }}></div>
            </div>

            {/* Floating Label (Tooltip) */}
            {!isOpen && (
                <div className="absolute right-20 top-4 bg-black/80 px-3 py-1.5 rounded text-[#D4AF37] text-xs whitespace-nowrap pointer-events-none opacity-0 animate-fadeInOut uppercase tracking-wider">
                    AURA Online
                </div>
            )}

            <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateX(10px); }
          10%, 90% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
        .animate-fadeInOut {
          animation: fadeInOut 4s infinite;
        }
      `}</style>
        </div>
    );
}
