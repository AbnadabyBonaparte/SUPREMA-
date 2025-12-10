// src/App.tsx — VERSÃO DEFINITIVA DYNASTY

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { AppProvider } from './src/contexts/AppContext';
import { initAnalytics } from './src/lib/analytics';
import { SupremeHeader } from './src/components/layout/SupremeHeader';
import { SupremeFooter } from './src/components/layout/SupremeFooter';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import CartDrawer from './src/components/cart/CartDrawer';
import ProtectedRoute from './src/components/ProtectedRoute';

// Lazy loading elite — code-splitting máximo
const HomePage = lazy(() => import('./src/app/routes/HomePage'));
const LoginPage = lazy(() => import('./src/app/routes/LoginPage'));
const DashboardPage = lazy(() => import('./src/app/routes/DashboardPage'));
const FidelidadePage = lazy(() => import('./src/app/routes/FidelidadePage'));
const MembershipPage = lazy(() => import('./src/app/routes/MembershipPage'));
const ProfilePage = lazy(() => import('./src/app/routes/ProfilePage'));
const SaloesPage = lazy(() => import('./src/app/routes/SaloesPage'));
const ShopPage = lazy(() => import('./src/app/routes/ShopPage'));
const PartnerPage = lazy(() => import('./src/app/routes/PartnerPage'));
const ProfessionalDashboardPage = lazy(() => import('./src/app/routes/ProfessionalDashboardPage'));
const CheckoutPage = lazy(() => import('./src/app/routes/CheckoutPage'));
const SustainabilityPage = lazy(() => import('./src/app/routes/SustainabilityPage'));
const LiveShoppingPage = lazy(() => import('./src/app/routes/LiveShoppingPage'));
const ProductDetailPage = lazy(() => import('./src/app/routes/ProductDetailPage'));
const CreatorSuitePage = lazy(() => import('./src/app/routes/CreatorSuitePage'));
const SettingsPage = lazy(() => import('./src/app/routes/SettingsPage'));
const ConsultoriaPage = lazy(() => import('./src/app/consultoria/page'));
const ImageStudio = lazy(() => import('./src/components/ai/ImageStudio'));
const ChatPage = lazy(() => import('./src/app/routes/ChatPage'));

// Fallback premium para erros de runtime (evita tela branca)
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-obsidian-950 text-marble-50 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-display mb-6">Erro de Inicialização</h1>
        <p className="text-xl text-marble-50/60 mb-8">
          A equipe Alsham foi notificada. Estamos corrigindo.
        </p>
        <pre className="bg-obsidian-900/50 p-6 rounded-xl text-left text-sm overflow-auto border border-sovereign-gold-700/20">
          {error.message}
        </pre>
      </div>
    </div>
  );
}

// Fallback premium para lazy loading
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-sovereign-gold-700 border-t-transparent rounded-full mx-auto mb-8"
        />
        <p className="text-2xl font-display text-sovereign-gold-500">Carregando Experiência Suprema...</p>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-obsidian-950 text-marble-50 flex flex-col">
            <SupremeHeader />

            <main className="flex-1 pt-20 lg:pt-24">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  
                  {/* Rotas Protegidas */}
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/fidelidade" element={<ProtectedRoute><FidelidadePage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  <Route path="/pro-dashboard" element={<ProtectedRoute requiredTier="premium"><ProfessionalDashboardPage /></ProtectedRoute>} />
                  <Route path="/creator-suite" element={<ProtectedRoute requiredTier="premium"><CreatorSuitePage /></ProtectedRoute>} />
                  
                  {/* Rotas Públicas */}
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/saloes" element={<SaloesPage />} />
                  <Route path="/booking" element={<SaloesPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/partner" element={<PartnerPage />} />
                  <Route path="/sustainability" element={<SustainabilityPage />} />
                  <Route path="/live" element={<LiveShoppingPage />} />
                  <Route path="/products/:productId" element={<ProductDetailPage />} />
                  <Route path="/consultoria" element={<ConsultoriaPage />} />
                  <Route path="/agents" element={<ConsultoriaPage />} />
                  <Route path="/experiences" element={<SaloesPage />} />
                  
                  {/* Rotas IA Premium */}
                  <Route path="/studio" element={<ImageStudio />} />
                  <Route path="/chat" element={<ChatPage />} />
                  
                  {/* 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <GlobalAssistant />
            <CartDrawer />
            <SupremeFooter />
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
