import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { env } from './src/lib/env';
import './src/index.css';

// DEBUG: confirma que a API Key chegou (vai aparecer no console)
if (!env.VITE_GOOGLE_API_KEY) {
  console.error('ERRO: VITE_GOOGLE_API_KEY não configurada no ambiente!');
} else {
  console.log('Google API Key carregada com sucesso');
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
