// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredTier?: 'free' | 'premium' | 'vip';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredTier,
  redirectTo = '/login'
}) => {
  const { user } = useApp();
  const location = useLocation();

  // Se não está logado, redireciona para login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Se requer tier específico e usuário não tem, redireciona para membership
  if (requiredTier) {
    const tierHierarchy = { free: 0, premium: 1, vip: 2 };
    const userTierLevel = tierHierarchy[user.tier];
    const requiredTierLevel = tierHierarchy[requiredTier];

    if (userTierLevel < requiredTierLevel) {
      return (
        <Navigate 
          to="/membership" 
          state={{ 
            from: location,
            requiredTier,
            message: `Esta funcionalidade requer plano ${requiredTier.toUpperCase()}`
          }} 
          replace 
        />
      );
    }
  }

  // Usuário autenticado e com tier adequado
  return <>{children}</>;
};

// ==================== COMPONENTE DE UPGRADE REQUIRED ====================

export const UpgradeRequired: React.FC<{ requiredTier: string }> = ({ requiredTier }) => {
  return (
    <div style={{
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      background: 'rgba(212, 175, 55, 0.05)',
      borderRadius: '16px',
      margin: '40px auto',
      maxWidth: '600px',
      border: '1px solid rgba(212, 175, 55, 0.2)'
    }}>
      {/* Icon */}
      <div style={{
        fontSize: '4rem',
        marginBottom: '20px'
      }}>
        👑
      </div>

      {/* Title */}
      <h2 style={{
        color: '#D4AF37',
        fontSize: '1.8rem',
        fontWeight: 700,
        marginBottom: '12px',
        letterSpacing: '0.5px'
      }}>
        Upgrade Necessário
      </h2>

      {/* Description */}
      <p style={{
        color: '#A0A0A0',
        fontSize: '1.1rem',
        marginBottom: '32px',
        lineHeight: 1.6,
        maxWidth: '450px'
      }}>
        Esta funcionalidade exclusiva requer o plano <strong style={{ color: '#D4AF37' }}>{requiredTier.toUpperCase()}</strong>.
      </p>

      {/* Benefits */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'left'
      }}>
        <h3 style={{
          color: '#F0F0F0',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Benefícios do plano {requiredTier.toUpperCase()}:
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          color: '#A0A0A0',
          fontSize: '0.95rem',
          lineHeight: 2
        }}>
          <li>✓ Acesso a todas as funcionalidades premium</li>
          <li>✓ Consultoria IA ilimitada</li>
          <li>✓ AR/VR Try-on avançado</li>
          <li>✓ Suporte prioritário 24/7</li>
          <li>✓ Descontos exclusivos na loja</li>
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => window.location.href = '/membership'}
        style={{
          padding: '16px 40px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #F0F0F0 100%)',
          color: '#000',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
        }}
      >
        Fazer Upgrade Agora
      </button>

      {/* Back link */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          background: 'transparent',
          color: '#666',
          border: 'none',
          fontSize: '0.9rem',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default ProtectedRoute;
