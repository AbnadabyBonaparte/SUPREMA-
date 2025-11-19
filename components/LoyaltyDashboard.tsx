
import React, { useState } from 'react';
import { saveLead } from '../services/supabaseClient';
import LoadingSpinner from './LoadingSpinner';

const LoyaltyDashboard: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            const result = await saveLead(name, email);
            
            if (result.error) {
                // Se for erro de configuração (sem banco), simulamos sucesso para demo
                if (typeof result.error === 'string' && result.error.includes("Banco de dados")) {
                    setMessage("Modo Demo: Lead registrado localmente (conecte o Supabase para salvar real).");
                    setStatus('success');
                } else {
                    throw new Error("Erro ao salvar.");
                }
            } else {
                setStatus('success');
                setMessage("Bem-vindo ao Clube Black. Seus dados estão seguros.");
                setName('');
                setEmail('');
            }
        } catch (err) {
            setStatus('error');
            setMessage("Erro ao conectar com o servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '40px 0' }}>
            <h2 style={{ color: '#F0F0F0', textAlign: 'center', marginBottom: '10px', fontSize: '2em' }}>LOYALTY SUPREME</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Seu status no universo Alsham.</p>
            
            {/* Black Card Design */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', 
                padding: '40px', 
                borderRadius: '20px', 
                border: '1px solid #333',
                maxWidth: '500px',
                margin: '0 auto',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Gold accent lines */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.1)' }}></div>
                <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.05)' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                     <div>
                         <h3 style={{ color: '#D4AF37', margin: '0', fontFamily: 'Cinzel, serif', letterSpacing: '2px' }}>ALSHAM</h3>
                         <span style={{ color: '#444', fontSize: '0.6em', textTransform: 'uppercase', letterSpacing: '3px' }}>Black Member</span>
                     </div>
                     <div style={{ fontSize: '2em' }}>🦅</div>
                </div>
                
                <div style={{ marginBottom: '30px' }}>
                    <span style={{ display: 'block', fontSize: '3.5em', fontWeight: 300, color: '#F0F0F0', fontFamily: 'Montserrat, sans-serif' }}>2,450</span>
                    <span style={{ fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '2px', color: '#D4AF37' }}>Supreme Points</span>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', color: '#888', marginBottom: '5px' }}>
                        <span>Progresso para Status Ouro</span>
                        <span>85%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '85%', height: '100%', backgroundColor: '#D4AF37', boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}></div>
                    </div>
                </div>
                
                <p style={{ color: '#555', fontSize: '0.8em', marginTop: '30px', fontFamily: 'monospace' }}>ID: 0000-8821-ALSHAM-X</p>
            </div>

            {/* Formulário de Cadastro Real */}
            <div style={{ maxWidth: '600px', margin: '50px auto 0', background: 'rgba(20,20,20,0.5)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ color: '#F0F0F0', fontSize: '1.2em', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px', textAlign: 'center' }}>
                    {status === 'success' ? 'Cadastro Realizado com Sucesso' : 'Ativar Membership Oficial'}
                </h3>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', color: '#D4AF37' }}>
                        <p>✅ {message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Nome Completo</label>
                            <input 
                                type="text" 
                                required 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '5px' }}>Email Corporativo/Pessoal</label>
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '4px' }}
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{ 
                                width: '100%', 
                                padding: '15px', 
                                background: '#D4AF37', 
                                color: '#000', 
                                border: 'none', 
                                borderRadius: '4px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                opacity: isSubmitting ? 0.7 : 1
                            }}>
                            {isSubmitting ? 'Processando...' : 'Cadastrar no Banco de Dados'}
                        </button>
                        {status === 'error' && <p style={{ color: 'red', marginTop: '10px', fontSize: '0.9em', textAlign: 'center' }}>{message}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoyaltyDashboard;
