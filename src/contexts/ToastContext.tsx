// src/contexts/ToastContext.tsx
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== INTERFACES ====================

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (props: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
  success: (description: string, title?: string) => void;
  error: (description: string, title?: string) => void;
  warning: (description: string, title?: string) => void;
  info: (description: string, title?: string) => void;
}

// ==================== CONTEXT ====================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ==================== PROVIDER ====================

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Adicionar toast
  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      ...props,
      id,
      duration: props.duration || 3000
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remover após duration
    setTimeout(() => {
      dismiss(id);
    }, newToast.duration);

    return id;
  }, []);

  // Remover toast
  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Helper functions
  const success = useCallback((description: string, title = 'Sucesso!') => {
    toast({ title, description, variant: 'success' });
  }, [toast]);

  const error = useCallback((description: string, title = 'Erro!') => {
    toast({ title, description, variant: 'error' });
  }, [toast]);

  const warning = useCallback((description: string, title = 'Atenção!') => {
    toast({ title, description, variant: 'warning' });
  }, [toast]);

  const info = useCallback((description: string, title = 'Info') => {
    toast({ title, description, variant: 'info' });
  }, [toast]);

  const value: ToastContextType = {
    toasts,
    toast,
    dismiss,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
};

// ==================== TOAST CONTAINER ====================

const ToastContainer = ({ 
  toasts, 
  dismiss 
}: { 
  toasts: Toast[]; 
  dismiss: (id: string) => void;
}) => {
  const variants = {
    success: {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%)',
      icon: '✓',
      color: '#fff'
    },
    error: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)',
      icon: '✕',
      color: '#fff'
    },
    warning: {
      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.95) 0%, rgba(202, 138, 4, 0.95) 100%)',
      icon: '⚠',
      color: '#000'
    },
    info: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)',
      icon: 'ℹ',
      color: '#fff'
    },
    default: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%)',
      icon: '✦',
      color: '#000'
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '420px',
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {toasts.map((toast) => {
          const variant = variants[toast.variant || 'default'];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                background: variant.background,
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '16px 20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                color: variant.color,
                cursor: 'pointer',
                pointerEvents: 'auto',
                minWidth: '320px',
                maxWidth: '420px'
              }}
              onClick={() => dismiss(toast.id)}
            >
              {/* Icon */}
              <div style={{
                fontSize: '1.5rem',
                lineHeight: 1,
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {variant.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {toast.title && (
                  <div style={{ 
                    fontWeight: 700,
                    marginBottom: toast.description ? '6px' : 0,
                    fontSize: '0.95rem',
                    letterSpacing: '0.3px'
                  }}>
                    {toast.title}
                  </div>
                )}
                {toast.description && (
                  <div style={{ 
                    fontSize: '0.875rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    wordBreak: 'break-word'
                  }}>
                    {toast.description}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss(toast.id);
                }}
                style={{
                  background: 'rgba(0, 0, 0, 0.15)',
                  border: 'none',
                  borderRadius: '6px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: variant.color,
                  fontSize: '1.2rem',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  opacity: 0.7
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.15)';
                }}
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// ==================== HOOK ====================

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export default ToastContext;
