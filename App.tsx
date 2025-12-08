// src/App.tsx

import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from '@/lib/router'  // Wrapper custom do projeto (só Routes/Route)
import { SupremeHeader } from '@/components/layout/SupremeHeader'
import { SupremeFooter } from '@/components/layout/SupremeFooter'
import HomePage from '@/app/routes/HomePage'
// Importe outras páginas...

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-obsidian-950 text-marble-50">
        <SupremeHeader />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Outras rotas */}
          </Routes>
        </main>

        <SupremeFooter />
      </div>
    </Router>
  )
}

export default App
