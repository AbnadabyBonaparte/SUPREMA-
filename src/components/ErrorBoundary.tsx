// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para renderizar UI de fallback
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log do erro para serviço de monitoramento (Sentry, etc.)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Callback opcional
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Aqui você pode enviar para Sentry, LogRocket, etc.
    // Example:
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Renderiza fallback customizado ou padrão
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
          background: 'rgba(239, 68, 68, 0.05)',
          borderRadius: '16px',
          margin: '40px auto',
          maxWidth: '600px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {/* Icon */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            opacity: 0.8
          }}>
            ⚠️
          </div>

          {/* Title */}
          <h2 style={{
            color: '#EF4444',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '12px',
            letterSpacing: '0.5px'
          }}>
            Algo deu errado
          </h2>

          {/* Description */}
          <p style={{
            color: '#A0A0A0',
            fontSize: '1rem',
            marginBottom: '24px',
            lineHeight: 1.6,
            maxWidth: '400px'
          }}>
            Desculpe pelo inconveniente. Estamos trabalhando para resolver o problema.
          </p>

          {/* Error details (apenas em dev) */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              marginBottom: '24px',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              textAlign: 'left',
              maxWidth: '500px',
              width: '100%',
              fontSize: '0.875rem',
              color: '#F0F0F0'
            }}>
              <summary style={{ 
                cursor: 'pointer', 
                fontWeight: 600,
                marginBottom: '12px',
                color: '#EF4444'
              }}>
                Detalhes do erro (dev only)
              </summary>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                <strong>Error:</strong> {this.state.error.toString()}
                <br /><br />
                <strong>Stack:</strong>
                <br />
                {this.state.errorInfo?.componentStack}
              </div>
            </details>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0F0F0 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Tentar novamente
            </button>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#D4AF37',
                border: '1px solid #D4AF37',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Voltar ao início
            </button>
          </div>

          {/* Help text */}
          <p style={{
            marginTop: '24px',
            fontSize: '0.875rem',
            color: '#666',
            fontStyle: 'italic'
          }}>
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
