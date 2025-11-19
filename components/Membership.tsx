
import React from 'react';

interface MembershipProps {
    onPlanSelect: () => void;
}

const Membership: React.FC<MembershipProps> = ({ onPlanSelect }) => {
    return (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <h2 style={{ color: '#F0F0F0', fontSize: '3em', fontFamily: 'Cinzel, serif', marginBottom: '10px' }}>ESCOLHA SEU NÍVEL</h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto 60px auto', fontFamily: 'Montserrat, sans-serif' }}>
                Desbloqueie o poder total da Inteligência Artificial e garanta acesso prioritário aos melhores profissionais do mundo.
            </p>

            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '40px' 
            }}>
                {/* PLANO GRATUITO */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid #333', 
                    borderRadius: '16px', 
                    padding: '40px', 
                    width: '350px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h3 style={{ color: '#A0A0A0', fontSize: '1.5em', marginBottom: '10px' }}>Member</h3>
                    <div style={{ fontSize: '3em', color: '#F0F0F0', fontWeight: 'bold', marginBottom: '30px' }}>
                        R$ 0<span style={{ fontSize: '0.4em', color: '#666' }}>/mês</span>
                    </div>
                    
                    <ul style={{ listStyle: 'none', padding: 0, color: '#CCC', marginBottom: '40px', flex: 1 }}>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>✓ Acesso ao Booking System</li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>✓ 1 Consulta de Estilo por mês</li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>✓ Acesso à Loja</li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', opacity: 0.5 }}>✕ Sem Try-On (Simulação)</li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', opacity: 0.5 }}>✕ Sem descontos</li>
                    </ul>

                    <button 
                        onClick={onPlanSelect}
                        style={{ 
                            width: '100%', 
                            padding: '15px', 
                            background: 'transparent', 
                            border: '1px solid #555', 
                            color: '#FFF', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontWeight: 'bold'
                        }}
                    >
                        Criar Conta Grátis
                    </button>
                </div>

                {/* PLANO PRIME (FEATURED) */}
                <div style={{ 
                    background: 'linear-gradient(145deg, #1a1a1a 0%, #050505 100%)', 
                    border: '2px solid #D4AF37', 
                    borderRadius: '16px', 
                    padding: '40px', 
                    width: '350px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transform: 'scale(1.05)',
                    boxShadow: '0 20px 60px rgba(212, 175, 55, 0.15)'
                }}>
                    <div style={{ 
                        position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', 
                        background: '#D4AF37', color: '#000', padding: '5px 15px', borderRadius: '20px', 
                        fontSize: '0.7em', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' 
                    }}>
                        Recomendado
                    </div>

                    <h3 style={{ color: '#D4AF37', fontSize: '1.5em', marginBottom: '10px', fontFamily: 'Cinzel, serif' }}>Alsham Prime</h3>
                    <div style={{ fontSize: '3em', color: '#F0F0F0', fontWeight: 'bold', marginBottom: '30px' }}>
                        R$ 39,90<span style={{ fontSize: '0.4em', color: '#666' }}>/mês</span>
                    </div>
                    
                    <ul style={{ listStyle: 'none', padding: 0, color: '#F0F0F0', marginBottom: '40px', flex: 1 }}>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <span style={{ color: '#D4AF37' }}>✦</span> Consultorias AI Ilimitadas
                        </li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <span style={{ color: '#D4AF37' }}>✦</span> Realidade Suprema (Try-On) Ilimitado
                        </li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <span style={{ color: '#D4AF37' }}>✦</span> 10% OFF em Serviços e Produtos
                        </li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <span style={{ color: '#D4AF37' }}>✦</span> Status Black no Loyalty
                        </li>
                        <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <span style={{ color: '#D4AF37' }}>✦</span> Acesso Antecipado a Tendências
                        </li>
                    </ul>

                    <button 
                        onClick={onPlanSelect}
                        style={{ 
                            width: '100%', 
                            padding: '18px', 
                            background: '#D4AF37', 
                            border: 'none', 
                            color: '#000', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '1em',
                            letterSpacing: '1px'
                        }}
                    >
                        Assinar Agora
                    </button>
                    <p style={{ textAlign: 'center', color: '#666', fontSize: '0.7em', marginTop: '15px' }}>
                        Powered by <strong>Stripe</strong>. Cancele quando quiser.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Membership;
