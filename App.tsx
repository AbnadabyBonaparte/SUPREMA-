import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import DashboardPage from './src/pages/DashboardPage';
import FidelidadePage from './src/pages/FidelidadePage';
import MembershipPage from './src/pages/MembershipPage';
import ProfilePage from './src/pages/ProfilePage';
import SaloesPage from './src/pages/SaloesPage';
import ShopPage from './src/pages/ShopPage';
import PartnerPage from './src/pages/PartnerPage';
import ProfessionalDashboardPage from './src/pages/ProfessionalDashboardPage';
import CheckoutPage from './src/pages/CheckoutPage';
import CartDrawer from './src/components/cart/CartDrawer';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import { Toaster } from '@/components/ui/sonner';

type Page = 'home' | 'login' | 'dashboard' | 'fidelidade' | 'membership' | 'profile' | 'saloes' | 'shop' | 'partner' | 'pro-dashboard' | 'checkout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'fidelidade':
        return <FidelidadePage />;
      case 'membership':
        return <MembershipPage />;
      case 'profile':
        return <ProfilePage />;
      case 'saloes':
        return <SaloesPage />;
      case 'shop':
        return <ShopPage />;
      case 'partner':
        return <PartnerPage />;
      case 'pro-dashboard':
        return <ProfessionalDashboardPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* CARRINHO GLOBAL */}
      <div className="fixed bottom-6 right-6 z-50">
        <CartDrawer />
      </div>

      {/* AURA FLUTUANTE */}
      <GlobalAssistant currentPage={currentPage} onNavigate={setCurrentPage} />

      <Footer />

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;
