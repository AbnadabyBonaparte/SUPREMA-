import { env } from './env';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_SCRIPT_ID = 'ga4-gtag-script';

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  if (!env.VITE_ENABLE_ANALYTICS) return;
  if (!env.VITE_GA_MEASUREMENT_ID) {
    console.warn('GA4 não inicializado: VITE_GA_MEASUREMENT_ID ausente.');
    return;
  }

  if (window.document.getElementById(GA_SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));

  const script = window.document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${env.VITE_GA_MEASUREMENT_ID}`;
  script.id = GA_SCRIPT_ID;

  script.onload = () => {
    window.gtag?.('js', new Date());
    window.gtag?.('config', env.VITE_GA_MEASUREMENT_ID, { anonymize_ip: true });
  };

  script.onerror = () => {
    console.warn('Falha ao carregar o script do Google Analytics 4. Aplicação seguirá sem tracking.');
  };

  window.document.head.appendChild(script);
};
