import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '@/services/ai/geminiService';
import { ChatMessage } from '@/types/ai';

export function Chat() {
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [useSearch, setUseSearch] = useState(false);
    const [useMaps, setUseMaps] = useState(false);
    const [location, setLocation] = useState<GeolocationCoordinates | undefined>(undefined);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        if (useMaps && !location) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position.coords);
                },
                (geoError) => {
                    setError(`Erro de geolocalização: ${geoError.message}. Habilite a permissão de localização no seu navegador.`);
                    setUseMaps(false);
                }
            );
        }
    }, [useMaps, location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: message };
        setHistory(prev => [...prev, newUserMessage]);
        setMessage('');
        setIsLoading(true);
        setError(null);

        const apiHistory = history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));

        try {
            const modelResponse = await getChatResponse(apiHistory, message, useSearch, useMaps, location);
            setHistory(prev => [...prev, modelResponse]);
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao contatar a IA.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-10 h-[calc(100vh-180px)] flex flex-col">
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="text-3xl font-light text-foreground mb-1">CONCIERGE DIGITAL</h2>
                <p className="text-[#D4AF37] text-xs uppercase tracking-[2px]">
                    Suporte, Dúvidas Rápidas & Localização de Parceiros
                </p>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl flex flex-col overflow-hidden">
                {/* Controls Header */}
                <div className="p-4 border-b border-white/5 flex gap-5 justify-center bg-black/20">
                    <label className="flex items-center gap-2 text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                        <input
                            type="checkbox"
                            checked={useSearch}
                            onChange={(e) => setUseSearch(e.target.checked)}
                            className="accent-[#D4AF37]"
                        />
                        Google Search (Dúvidas de Produtos)
                    </label>
                    <label className="flex items-center gap-2 text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
                        <input
                            type="checkbox"
                            checked={useMaps}
                            onChange={(e) => setUseMaps(e.target.checked)}
                            className="accent-[#D4AF37]"
                        />
                        Google Maps (Encontrar Unidade)
                    </label>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {history.length === 0 && (
                        <div className="text-center text-gray-600 mt-12">
                            <p className="text-xl font-serif mb-4">Bem-vindo ao Suporte Suprema.</p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>"Onde fica o salão parceiro mais próximo?"</li>
                                <li>"Esse produto é vegano?"</li>
                                <li>"Como agendar uma consultoria presencial?"</li>
                            </ul>
                        </div>
                    )}

                    {history.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                inline-block max-w-[70%] px-5 py-4 rounded-2xl shadow-lg
                ${msg.role === 'user'
                                    ? 'bg-[#D4AF37] text-black rounded-br-none font-semibold'
                                    : 'bg-white/5 text-foreground border border-white/10 rounded-bl-none'
                                }
              `}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>

                                {msg.groundingSources && msg.groundingSources.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-current/10">
                                        <h5 className="text-xs uppercase opacity-70 mb-2">Fontes Verificadas:</h5>
                                        {msg.groundingSources.map((source, i) => (
                                            <a
                                                key={i}
                                                href={source.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`
                          text-xs block mb-1 truncate hover:underline
                          ${msg.role === 'user' ? 'text-black' : 'text-[#D4AF37]'}
                        `}
                                            >
                                                🔗 {source.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="inline-block px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="px-3 py-2 bg-red-500/10 text-red-400 text-xs text-center">
                        {error}
                    </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-5 bg-black/30 flex gap-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        className="flex-1 px-4 py-4 bg-white/5 border border-white/10 text-foreground rounded-lg outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg uppercase text-sm tracking-wider hover:bg-[#F2D06B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
