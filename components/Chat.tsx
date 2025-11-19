
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';

const Chat: React.FC = () => {
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
    }, [useMaps]);

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
        <div style={{ padding: '40px 0', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2em', fontWeight: 400 }}>CONCIERGE DIGITAL</h2>
                <p style={{ color: '#D4AF37', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7em' }}>
                    Suporte, Dúvidas Rápidas & Localização de Parceiros
                </p>
            </div>

            <div style={{ 
                flex: 1,
                background: 'rgba(20, 20, 20, 0.6)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Controls Header */}
                <div style={{ 
                    padding: '15px 20px', 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A0A0A0', fontSize: '0.85em', cursor: 'pointer' }}>
                        <input type="checkbox" checked={useSearch} onChange={(e) => setUseSearch(e.target.checked)} style={{ accentColor: '#D4AF37' }} />
                        Google Search (Dúvidas de Produtos)
                    </label>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A0A0A0', fontSize: '0.85em', cursor: 'pointer' }}>
                        <input type="checkbox" checked={useMaps} onChange={(e) => setUseMaps(e.target.checked)} style={{ accentColor: '#D4AF37' }} />
                        Google Maps (Encontrar Unidade)
                    </label>
                </div>

                {/* Chat Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {history.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#444', marginTop: '50px' }}>
                            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2em' }}>Bem-vindo ao Suporte Suprema.</p>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9em', lineHeight: '1.6', color: '#666' }}>
                                <li>"Onde fica o salão parceiro mais próximo?"</li>
                                <li>"Esse produto é vegano?"</li>
                                <li>"Como agendar uma consultoria presencial?"</li>
                            </ul>
                        </div>
                    )}
                    {history.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '20px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '15px 20px',
                                borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                backgroundColor: msg.role === 'user' ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                                color: msg.role === 'user' ? '#050505' : '#F0F0F0',
                                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                maxWidth: '70%',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                fontWeight: msg.role === 'user' ? 600 : 400,
                                lineHeight: '1.5'
                            }}>
                               <p style={{margin:0, fontSize: '0.95em'}}>{msg.text}</p>
                               
                               {msg.groundingSources && msg.groundingSources.length > 0 && (
                                   <div style={{marginTop: '15px', borderTop: `1px solid ${msg.role === 'user' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`, paddingTop: '10px'}}>
                                       <h5 style={{margin: '0 0 5px 0', fontSize:'0.7em', textTransform: 'uppercase', opacity: 0.7}}>Fontes Verificadas:</h5>
                                       {msg.groundingSources.map((source, i) => (
                                          <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" style={{
                                              fontSize: '0.8em', 
                                              display: 'block', 
                                              color: msg.role === 'user' ? '#000' : '#D4AF37',
                                              textDecoration: 'none',
                                              marginBottom: '3px',
                                              whiteSpace: 'nowrap',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis'
                                          }}>🔗 {source.title}</a> 
                                       ))}
                                   </div>
                               )}
                            </div>
                        </div>
                    ))}
                     {isLoading && <div style={{ display: 'flex', justifyContent: 'flex-start' }}><LoadingSpinner /></div>}
                    <div ref={chatEndRef} />
                </div>

                {error && <div style={{ padding: '10px', backgroundColor: 'rgba(232, 122, 94, 0.1)', color: '#E87A5E', fontSize: '0.8em', textAlign: 'center' }}>{error}</div>}

                {/* Input Area */}
                <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', gap: '15px' }}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        style={{ 
                            flex: 1, 
                            padding: '15px', 
                            backgroundColor: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            color: '#F0F0F0', 
                            borderRadius: '8px',
                            outline: 'none',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                    />
                    <button type="submit" disabled={isLoading} style={{ 
                        padding: '0 30px', 
                        backgroundColor: '#D4AF37', 
                        color: '#050505', 
                        fontWeight: 'bold', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontSize: '0.85em',
                        letterSpacing: '1px',
                        transition: 'background 0.3s'
                    }}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
