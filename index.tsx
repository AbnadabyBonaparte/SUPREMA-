import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // se existir, senão pode remover essa linha

// DEBUG: confirma que a API Key chegou (vai aparecer no console)
if (!import.meta.env.VITE_GEMINI_API_KEY) {
  console.error('ERRO CRÍTICO: VITE_GEMINI_API_KEY não está configurada no Vercel!');
} else {
  console.log('Gemini API Key carregada com sucesso');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
