// src/components/ui/badge.tsx
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children,
  style,
  ...props 
}) => {
  const variants = {
    default: {
      background: 'rgba(212, 175, 55, 0.2)',
      color: '#D4AF37',
      border: '1px solid rgba(212, 175, 55, 0.5)'
    },
    success: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#22C55E',
      border: '1px solid rgba(34, 197, 94, 0.5)'
    },
    warning: {
      background: 'rgba(234, 179, 8, 0.2)',
      color: '#EAB308',
      border: '1px solid rgba(234, 179, 8, 0.5)'
    },
    error: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#EF4444',
      border: '1px solid rgba(239, 68, 68, 0.5)'
    },
    gold: {
      background: 'linear-gradient(135deg, #D4AF37 0%, #F0F0F0 100%)',
      color: '#000',
      border: 'none',
      fontWeight: 700
    },
    outline: {
      background: 'transparent',
      color: '#F0F0F0',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }
  };

  return (
    <div 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        padding: '4px 12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
