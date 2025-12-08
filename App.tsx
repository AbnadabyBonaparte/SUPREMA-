import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from '@/lib/router';
import AppRoutes from './src/app/router';
import { AppProvider } from './src/contexts/AppContext';
import { initAnalytics } from './src/lib/analytics';

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<div style={{ padding: '20px' }}>Carregando...</div>}>
          <Routes>
            <AppRoutes RouteComponent={Route} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;
