
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
        padding: '60px 20px', 
        backgroundColor: '#000000', 
        borderTop: '1px solid #222', 
        textAlign: 'center', 
        marginTop: '80px',
        color: '#666',
        fontSize: '0.8em',
        fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Logo Simulado */}
          <h3 style={{ color: '#D4AF37', fontSize: '1.5em', fontFamily: 'Cinzel, serif', margin: 0 }}>ALSHAM</h3>

          <div style={{ width: '50px', height: '1px', background: '#333', margin: '0 auto' }}></div>

          <p style={{ lineHeight: '1.8' }}>
            <strong>ALSHAM GLOBAL COMMERCE LTDA</strong><br/>
            CNPJ: 59.332.265/0001-30<br/>
            Email Corporativo: <a href="mailto:ALSHAM.ADMIN@ALSHAMGLOBAL.COM.BR" style={{ color: '#D4AF37', textDecoration: 'none' }}>ALSHAM.ADMIN@ALSHAMGLOBAL.COM.BR</a>
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9em', color: '#444', flexWrap: 'wrap' }}>
              <span>Termos de Uso</span>
              <span>Política de Privacidade</span>
              <span>Investidores</span>
              <span>Trabalhe Conosco</span>
          </div>

          <p style={{ color: '#333', marginTop: '20px', fontSize: '0.75em' }}>
            &copy; {new Date().getFullYear()} Alsham Corporation. Tecnologia transcendental. Todos os direitos reservados.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
