import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Route } from '@/lib/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from './routes/RootLayout';

const HomePage = lazy(() => import('./routes/HomePage'));
const LoginPage = lazy(() => import('./routes/LoginPage'));
const DashboardPage = lazy(() => import('./routes/DashboardPage'));
const FidelidadePage = lazy(() => import('./routes/FidelidadePage'));
const MembershipPage = lazy(() => import('./routes/MembershipPage'));
const ProfilePage = lazy(() => import('./routes/ProfilePage'));
const SaloesPage = lazy(() => import('./routes/SaloesPage'));
const ShopPage = lazy(() => import('./routes/ShopPage'));
const PartnerPage = lazy(() => import('./routes/PartnerPage'));
const ProfessionalDashboardPage = lazy(() => import('./routes/ProfessionalDashboardPage'));
const CheckoutPage = lazy(() => import('./routes/CheckoutPage'));
const SustainabilityPage = lazy(() => import('./routes/SustainabilityPage'));
const LiveShoppingPage = lazy(() => import('./routes/LiveShoppingPage'));
const ProductDetailPage = lazy(() => import('./routes/ProductDetailPage'));
const CreatorSuitePage = lazy(() => import('./routes/CreatorSuitePage'));
const SettingsPage = lazy(() => import('./routes/SettingsPage'));

export const renderAppRoutes = (RouteComponent: typeof Route = Route) => {
  const RouteEl = RouteComponent;

  return (
    <>
      <RouteEl path="/" element={<RootLayout />}>
        <RouteEl index element={<HomePage />} />
        <RouteEl path="login" element={<LoginPage />} />
        <RouteEl
          path="dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <RouteEl
          path="fidelidade"
          element={<ProtectedRoute><FidelidadePage /></ProtectedRoute>}
        />
        <RouteEl path="membership" element={<MembershipPage />} />
        <RouteEl
          path="profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />
        <RouteEl path="saloes" element={<SaloesPage />} />
        <RouteEl path="shop" element={<ShopPage />} />
        <RouteEl path="partner" element={<PartnerPage />} />
        <RouteEl
          path="pro-dashboard"
          element={<ProtectedRoute requiredTier="premium"><ProfessionalDashboardPage /></ProtectedRoute>}
        />
        <RouteEl
          path="checkout"
          element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
        />
        <RouteEl path="sustainability" element={<SustainabilityPage />} />
        <RouteEl path="live" element={<LiveShoppingPage />} />
        <RouteEl path="products/:productId" element={<ProductDetailPage />} />
        <RouteEl
          path="creator-suite"
          element={<ProtectedRoute requiredTier="premium"><CreatorSuitePage /></ProtectedRoute>}
        />
        <RouteEl
          path="settings"
          element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
        />
        <RouteEl path="*" element={<Navigate to="/" replace />} />
      </RouteEl>
    </>
  );
};

export default renderAppRoutes;
