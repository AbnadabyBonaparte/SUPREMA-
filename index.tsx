import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// DEBUG: confirma que a API Key chegou (vai aparecer no console)
if (!import.meta.env.VITE_GEMINI_API_KEY) {
  console.error('ERRO: VITE_GEMINI_API_KEY não configurada no Vercel!');
} else {
  console.log('Gemini API Key carregada com sucesso');
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
