
import React, { useState } from 'react';

interface LoginProps {
    onLoginSuccess: () => void;
    onRegisterClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onRegisterClick }) => {
    const [activeTab, setActiveTab] = useState<'client' | 'partner'>('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulação de Autenticação
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
        }, 1500);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '70vh',
            padding: '40px 0'
        }}>
            <div style={{ 
                background: '#121212', 
                width: '100%', 
                maxWidth: '450px', 
                padding: '40px', 
                borderRadius: '20px', 
                border: '1px solid #333',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontFamily: 'Cinzel, serif', color: '#F0F0F0', fontSize: '2em', margin: 0 }}>THE VAULT</h2>
                    <p style={{ color: '#666', fontSize: '0.8em', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '10px' }}>Acesso Seguro Alsham</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #333', marginBottom: '30px' }}>
                    <button 
                        onClick={() => setActiveTab('client')}
                        style={{ 
                            flex: 1, 
                            padding: '15px', 
                            background: 'transparent', 
                            border: 'none', 
                            color: activeTab === 'client' ? '#D4AF37' : '#666',
                            borderBottom: activeTab === 'client' ? '2px solid #D4AF37' : 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.8em',
                            letterSpacing: '1px'
                        }}
                    >
                        Cliente
                    </button>
                    <button 
                        onClick={() => setActiveTab('partner')}
                        style={{ 
                            flex: 1, 
                            padding: '15px', 
                            background: 'transparent', 
                            border: 'none', 
                            color: activeTab === 'partner' ? '#D4AF37' : '#666',
                            borderBottom: activeTab === 'partner' ? '2px solid #D4AF37' : 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.8em',
                            letterSpacing: '1px'
                        }}
                    >
                        Parceiro B2B
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#888', fontSize: '0.8em', marginBottom: '8px' }}>Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '15px', 
                                background: '#050505', 
                                border: '1px solid #333', 
                                color: '#FFF', 
                                borderRadius: '6px',
                                outline: 'none',
                                fontFamily: 'Montserrat, sans-serif'
                            }} 
                            placeholder="exemplo@email.com"
                        />
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ color: '#888', fontSize: '0.8em' }}>Senha</label>
                            <span style={{ color: '#D4AF37', fontSize: '0.7em', cursor: 'pointer' }}>Esqueceu?</span>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '15px', 
                                background: '#050505', 
                                border: '1px solid #333', 
                                color: '#FFF', 
                                borderRadius: '6px',
                                outline: 'none',
                                fontFamily: 'Montserrat, sans-serif'
                            }} 
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            background: '#D4AF37', 
                            color: '#000', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Autenticando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                {/* Social Login Mock */}
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <p style={{ color: '#444', fontSize: '0.8em', marginBottom: '15px' }}>ou entre com</p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1A1A1A', border: '1px solid #333', color: '#FFF', cursor: 'pointer' }}>G</button>
                        <button style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1A1A1A', border: '1px solid #333', color: '#FFF', cursor: 'pointer' }}></button>
                    </div>
                </div>

                {/* Register Link */}
                {activeTab === 'client' && (
                    <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #222', paddingTop: '20px' }}>
                        <p style={{ color: '#888', fontSize: '0.9em' }}>Ainda não é membro?</p>
                        <button 
                            onClick={onRegisterClick}
                            style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '1px', marginTop: '5px' }}
                        >
                            Criar Conta Premium
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
