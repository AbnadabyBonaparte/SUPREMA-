
import React from 'react';

type Page = 'home' | 'consultant' | 'studio' | 'chat' | 'tts' | 'loyalty' | 'booking' | 'shop' | 'login' | 'membership' | 'partner';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navButtonStyle = (page: Page) => ({
    padding: '10px 15px',
    backgroundColor: 'transparent',
    color: currentPage === page ? '#D4AF37' : '#A0A0A0',
    borderBottom: currentPage === page ? '2px solid #D4AF37' : '2px solid transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '0',
    cursor: 'pointer',
    fontWeight: currentPage === page ? 600 : 400,
    fontSize: '0.85em',
    textTransform: 'uppercase' as 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.4s ease',
    fontFamily: 'Montserrat, sans-serif',
    margin: '0 2px'
  });

  return (
    <header style={{ 
        padding: '20px 40px', 
        background: 'rgba(5, 5, 5, 0.9)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
      {/* Top Bar: B2B Link */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button 
            onClick={() => setCurrentPage('partner')}
            style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
          >
            Área do Parceiro (Business) &rarr;
          </button>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h1 
            onClick={() => setCurrentPage('home')}
            style={{ 
              color: '#F0F0F0', 
              margin: '0', 
              fontSize: '2.2em',
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              background: 'linear-gradient(45deg, #F0F0F0 30%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
          }}>
            Suprema Beleza
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
             <span style={{ height: '1px', width: '30px', backgroundColor: '#D4AF37' }}></span>
             <span style={{ color: '#D4AF37', fontSize: '0.75em', letterSpacing: '6px', textTransform: 'uppercase' }}>Ecosystem X.0</span>
             <span style={{ height: '1px', width: '30px', backgroundColor: '#D4AF37' }}></span>
          </div>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <nav style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', flex: 1 }}>
            <button onClick={() => setCurrentPage('home')} style={navButtonStyle('home')}>Matriz</button>
            <button onClick={() => setCurrentPage('studio')} style={navButtonStyle('studio')}>Estúdio</button>
            <button onClick={() => setCurrentPage('booking')} style={navButtonStyle('booking')}>Agendar</button>
            <button onClick={() => setCurrentPage('shop')} style={navButtonStyle('shop')}>Loja</button>
            <button onClick={() => setCurrentPage('chat')} style={navButtonStyle('chat')}>Concierge</button>
            <button onClick={() => setCurrentPage('tts')} style={navButtonStyle('tts')}>Voz</button>
          </nav>

          <div style={{ marginLeft: '20px' }}>
              <button 
                onClick={() => setCurrentPage('login')}
                style={{
                    padding: '10px 25px',
                    background: 'transparent',
                    border: '1px solid #D4AF37',
                    color: '#D4AF37',
                    borderRadius: '30px',
                    textTransform: 'uppercase',
                    fontSize: '0.75em',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D4AF37';
                    e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#D4AF37';
                }}
              >
                  Entrar / Assinar
              </button>
          </div>
      </div>
    </header>
  );
};

export default Header;
