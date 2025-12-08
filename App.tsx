<<<<<<< HEAD
// src/App.tsx
=======
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from '@/lib/router';
import AppRoutes from './src/app/router';
import { AppProvider } from './src/contexts/AppContext';
import { initAnalytics } from './src/lib/analytics';
>>>>>>> 0ec9804 (fix(router): correct BrowserRouter import for Vite build)

import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from '@/lib/router'  // Wrapper custom do projeto (só Routes/Route)
import { SupremeHeader } from '@/components/layout/SupremeHeader'
import { SupremeFooter } from '@/components/layout/SupremeFooter'
import HomePage from '@/app/routes/HomePage'
// Importe outras páginas...

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="min-h-screen bg-obsidian-950 text-marble-50">
        <SupremeHeader />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Outras rotas */}
          </Routes>
        </main>
=======
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
};
>>>>>>> 0ec9804 (fix(router): correct BrowserRouter import for Vite build)

        <SupremeFooter />
      </div>
    </Router>
  )
}

export default App
