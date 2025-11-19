
import React from 'react';

const LoyaltyDashboard: React.FC = () => {
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

            <div style={{ maxWidth: '600px', margin: '50px auto 0' }}>
                <h3 style={{ color: '#F0F0F0', fontSize: '1.2em', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Histórico de Ativos</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                    <div style={{ backgroundColor: '#111', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', border: '1px solid #222', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#DDD', fontWeight: 500 }}>Consultoria Facial 3D</div>
                            <div style={{ color: '#555', fontSize: '0.8em' }}>Ontem, 14:30</div>
                        </div>
                        <span style={{ color: '#D4AF37', fontFamily: 'monospace' }}>+500 pts</span>
                    </div>
                     <div style={{ backgroundColor: '#111', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', border: '1px solid #222', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: '#DDD', fontWeight: 500 }}>Kit Beard Oil Premium</div>
                            <div style={{ color: '#555', fontSize: '0.8em' }}>22 Out, 10:15</div>
                        </div>
                        <span style={{ color: '#D4AF37', fontFamily: 'monospace' }}>+150 pts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyDashboard;