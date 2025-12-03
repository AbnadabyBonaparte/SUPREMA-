import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './src/app/router';
import { AppProvider } from './src/contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} fallback={<div style={{ padding: '20px' }}>Carregando...</div>} />
    </AppProvider>
  );
};

export default App;
