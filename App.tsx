// App.tsx - VERSÃO FINAL ATUALIZADA
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
import SustainabilityPage from './src/pages/SustainabilityPage';
import LiveShoppingPage from './src/pages/LiveShoppingPage';
import ProductDetailPage from './src/pages/ProductDetailPage';
import CreatorSuitePage from './src/pages/CreatorSuitePage';
import SettingsPage from './src/pages/SettingsPage';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import CartDrawer from './src/components/cart/CartDrawer';
import { ProfessionalType, Trend } from './src/types/ai';

type PageType = 
  | 'home' 
  | 'login' 
  | 'dashboard' 
  | 'fidelidade' 
  | 'membership' 
  | 'profile' 
  | 'saloes' 
  | 'shop' 
  | 'partner' 
  | 'pro-dashboard' 
  | 'checkout' 
  | 'sustainability' 
  | 'live'
  | 'product-detail'
  | 'creator-suite'
  | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalType | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('1');

  const handleProfessionalSelect = (professional: ProfessionalType) => {
    setSelectedProfessional(professional);
    // Pode navegar para uma página de consulta ou abrir modal
  };

  const handleTrendSelect = (trend: Trend) => {
    setSelectedTrend(trend);
    // Pode navegar para página de detalhes da trend
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
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
        return <ShopPage onProductSelect={handleProductSelect} />;
      case 'partner':
        return <PartnerPage />;
      case 'pro-dashboard':
        return <ProfessionalDashboardPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'live':
        return <LiveShoppingPage />;
      case 'product-detail':
        return <ProductDetailPage productId={selectedProductId} onBack={() => setCurrentPage('shop')} />;
      case 'creator-suite':
        return <CreatorSuitePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <HomePage 
            onProfessionalSelect={handleProfessionalSelect} 
            onTrendSelect={handleTrendSelect} 
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        {renderPage()}
      </main>
      <GlobalAssistant currentPage={currentPage} onNavigate={setCurrentPage} />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default App;
