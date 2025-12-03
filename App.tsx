import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './src/app/router';
import { AppProvider } from './src/contexts/AppContext';
import { initAnalytics } from './src/lib/analytics';

const App: React.FC = () => {
  useEffect(() => {
    try {
      initAnalytics();
    } catch (error) {
      console.warn('Falha ao inicializar analytics:', error);
    }
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} fallback={<div style={{ padding: '20px' }}>Carregando...</div>} />
    </AppProvider>
  );
};

export default App;
