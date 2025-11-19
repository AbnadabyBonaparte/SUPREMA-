
import React from 'react';

type Page = 'home' | 'consultant' | 'studio' | 'chat' | 'tts' | 'loyalty' | 'booking' | 'shop';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navButtonStyle = (page: Page) => ({
    padding: '10px 20px',
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
    margin: '0 5px'
  });

  return (
    <header style={{ 
        padding: '30px 40px', 
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
    }}>
      <div style={{ marginBottom: '25px' }}>
          <h1 style={{ 
              color: '#F0F0F0', 
              margin: '0', 
              fontSize: '2.2em',
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              background: 'linear-gradient(45deg, #F0F0F0 30%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
          }}>
            Suprema Beleza
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
             <span style={{ height: '1px', width: '30px', backgroundColor: '#D4AF37' }}></span>
             <span style={{ color: '#D4AF37', fontSize: '0.75em', letterSpacing: '6px', textTransform: 'uppercase' }}>Ecosystem X.0</span>
             <span style={{ height: '1px', width: '30px', backgroundColor: '#D4AF37' }}></span>
          </div>
      </div>
      <nav style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <button onClick={() => setCurrentPage('home')} style={navButtonStyle('home')}>Matriz</button>
        <button onClick={() => setCurrentPage('studio')} style={navButtonStyle('studio')}>Estúdio</button>
        <button onClick={() => setCurrentPage('booking')} style={navButtonStyle('booking')}>Agendar</button>
        <button onClick={() => setCurrentPage('shop')} style={navButtonStyle('shop')}>Loja</button>
        <button onClick={() => setCurrentPage('chat')} style={navButtonStyle('chat')}>Concierge</button>
        <button onClick={() => setCurrentPage('tts')} style={navButtonStyle('tts')}>Voz</button>
        <button onClick={() => setCurrentPage('loyalty')} style={navButtonStyle('loyalty')}>Loyalty</button>
      </nav>
    </header>
  );
};

export default Header;
