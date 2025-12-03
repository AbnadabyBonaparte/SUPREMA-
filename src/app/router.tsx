import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: 'fidelidade', element: <ProtectedRoute><FidelidadePage /></ProtectedRoute> },
      { path: 'membership', element: <MembershipPage /> },
      { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'saloes', element: <SaloesPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'partner', element: <PartnerPage /> },
      { path: 'pro-dashboard', element: <ProtectedRoute requiredTier="premium"><ProfessionalDashboardPage /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
      { path: 'sustainability', element: <SustainabilityPage /> },
      { path: 'live', element: <LiveShoppingPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'creator-suite', element: <ProtectedRoute requiredTier="premium"><CreatorSuitePage /></ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute><SettingsPage /></ProtectedRoute> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);
