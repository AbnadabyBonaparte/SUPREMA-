import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './src/contexts/AppContext'; // Criar
import { ToastProvider } from './src/contexts/ToastContext'; // Criar
import { ErrorBoundary } from './src/components/ErrorBoundary'; // Criar
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import CartDrawer from './src/components/cart/CartDrawer';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import { ProtectedRoute } from './src/components/ProtectedRoute'; // Criar

// --- Lazy Loading das Páginas ---
const HomePage = lazy(() => import('./src/pages/HomePage'));
const LoginPage = lazy(() => import('./src/pages/LoginPage'));
const DashboardPage = lazy(() => import('./src/pages/DashboardPage'));
const FidelidadePage = lazy(() => import('./src/pages/FidelidadePage'));
const MembershipPage = lazy(() => import('./src/pages/MembershipPage'));
const ProfilePage = lazy(() => import('./src/pages/ProfilePage'));
const SaloesPage = lazy(() => import('./src/pages/SaloesPage'));
const ShopPage = lazy(() => import('./src/pages/ShopPage'));
const PartnerPage = lazy(() => import('./src/pages/PartnerPage'));
const ProfessionalDashboardPage = lazy(() => import('./src/pages/ProfessionalDashboardPage'));
const CheckoutPage = lazy(() => import('./src/pages/CheckoutPage'));
const SustainabilityPage = lazy(() => import('./src/pages/SustainabilityPage'));
const LiveShoppingPage = lazy(() => import('./src/pages/LiveShoppingPage'));
const ProductDetailPage = lazy(() => import('./src/pages/ProductDetailPage')); // Nova
const CreatorSuitePage = lazy(() => import('./src/pages/CreatorSuitePage')); // Nova
const SettingsPage = lazy(() => import('./src/pages/SettingsPage')); // Nova

// --- Componentes de IA (carregados sob demanda se necessário) ---
const SmartConsultation = lazy(() => import('./src/components/ai/SmartConsultation'));
const ImageStudio = lazy(() => import('./src/components/ai/ImageStudio'));
const Chat = lazy(() => import('./src/components/ai/Chat'));

const App: React.FC = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
              <ErrorBoundary fallback={<h2>Algo deu errado. Tente recarregar a página.</h2>}>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* --- Rotas Públicas --- */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:productId" element={<ProductDetailPage />} />
                    <Route path="/saloes" element={<SaloesPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/partner" element={<PartnerPage />} />
                    <Route path="/sustainability" element={<SustainabilityPage />} />
                    <Route path="/live" element={<LiveShoppingPage />} />

                    {/* --- Rotas de IA --- */}
                    <Route path="/consultant" element={<SmartConsultation />} />
                    <Route path="/studio" element={<ImageStudio />} />
                    <Route path="/chat" element={<Chat />} />

                    {/* --- Rotas Protegidas (exigem login) --- */}
                    <Route 
                      path="/profile"
                      element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                    />
                    <Route 
                      path="/dashboard"
                      element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
                    />
                    <Route 
                      path="/fidelidade"
                      element={<ProtectedRoute><FidelidadePage /></ProtectedRoute>}
                    />
                    <Route 
                      path="/checkout"
                      element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
                    />
                    <Route 
                      path="/creator-suite"
                      element={<ProtectedRoute><CreatorSuitePage /></ProtectedRoute>}
                    />
                    <Route 
                      path="/settings"
                      element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
                    />

                    {/* --- Rotas de Profissional (exigem tier específico) --- */}
                    <Route 
                      path="/pro-dashboard"
                      element={<ProtectedRoute requiredTier='premium'><ProfessionalDashboardPage /></ProtectedRoute>}
                    />

                    {/* Rota de fallback */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <GlobalAssistant />
            <CartDrawer />
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
};

export default App;
