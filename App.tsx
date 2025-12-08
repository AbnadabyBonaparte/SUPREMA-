import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppProvider } from './src/contexts/AppContext';
import { initAnalytics } from './src/lib/analytics';
import { SupremeHeader } from './src/components/layout/SupremeHeader';
import { SupremeFooter } from './src/components/layout/SupremeFooter';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import CartDrawer from './src/components/cart/CartDrawer';
import ProtectedRoute from './src/components/ProtectedRoute';

const HomePage = lazy(() => import('./src/app/routes/HomePage'));
const LoginPage = lazy(() => import('./src/app/routes/LoginPage'));
const DashboardPage = lazy(() => import('./src/app/routes/DashboardPage'));
const FidelidadePage = lazy(() => import('./src/app/routes/FidelidadePage'));
const MembershipPage = lazy(() => import('./src/app/routes/MembershipPage'));
const ProfilePage = lazy(() => import('./src/app/routes/ProfilePage'));
const SaloesPage = lazy(() => import('./src/app/routes/SaloesPage'));
const ShopPage = lazy(() => import('./src/app/routes/ShopPage'));
const PartnerPage = lazy(() => import('./src/app/routes/PartnerPage'));
const ProfessionalDashboardPage = lazy(
  () => import('./src/app/routes/ProfessionalDashboardPage'),
);
const CheckoutPage = lazy(() => import('./src/app/routes/CheckoutPage'));
const SustainabilityPage = lazy(
  () => import('./src/app/routes/SustainabilityPage'),
);
const LiveShoppingPage = lazy(
  () => import('./src/app/routes/LiveShoppingPage'),
);
const ProductDetailPage = lazy(
  () => import('./src/app/routes/ProductDetailPage'),
);
const CreatorSuitePage = lazy(
  () => import('./src/app/routes/CreatorSuitePage'),
);
const SettingsPage = lazy(() => import('./src/app/routes/SettingsPage'));
const ConsultoriaPage = lazy(() => import('./src/app/consultoria/page'));

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-obsidian-950 text-marble-50 flex flex-col">
          <SupremeHeader />

          <Suspense
            fallback={
              <div className="py-20 text-center text-marble-50/70">
                Carregando...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fidelidade"
                element={
                  <ProtectedRoute>
                    <FidelidadePage />
                  </ProtectedRoute>
                }
              />

              <Route path="/membership" element={<MembershipPage />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route path="/saloes" element={<SaloesPage />} />
              <Route path="/booking" element={<SaloesPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/partner" element={<PartnerPage />} />

              <Route
                path="/pro-dashboard"
                element={
                  <ProtectedRoute requiredTier="premium">
                    <ProfessionalDashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/live" element={<LiveShoppingPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />

              <Route
                path="/creator-suite"
                element={
                  <ProtectedRoute requiredTier="premium">
                    <CreatorSuitePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/consultoria" element={<ConsultoriaPage />} />
              <Route path="/agents" element={<ConsultoriaPage />} />
              <Route path="/experiences" element={<SaloesPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          <GlobalAssistant />
          <CartDrawer />
          <SupremeFooter />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
