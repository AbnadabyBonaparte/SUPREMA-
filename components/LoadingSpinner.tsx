import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
      <div className="loader"></div>
      <style>{`
        .loader {
          border: 2px solid rgba(255,255,255,0.1);
          border-top: 2px solid #D4AF37;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9em', letterSpacing: '1px', textTransform: 'uppercase' }}>Processando Inteligência...</p>
    </div>
  );
};

export default LoadingSpinner;