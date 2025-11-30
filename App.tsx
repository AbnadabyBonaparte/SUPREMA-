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
import SmartConsultation from './src/components/ai/SmartConsultation';
import { ImageStudio } from './src/components/ai/ImageStudio';
import { Chat } from './src/components/ai/Chat';
import TextToSpeech from './components/TextToSpeech';
import CartDrawer from './src/components/cart/CartDrawer';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import { ProfessionalType, Trend } from './types';

type Page = 'home' | 'consultant' | 'studio' | 'chat' | 'tts' | 'loyalty' | 'booking' | 'shop' | 'login' | 'membership' | 'partner' | 'dashboard' | 'profile' | 'pro-dashboard' | 'checkout' | 'sustainability' | 'live';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalType>('barber_x0');
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  const handleProfessionalSelect = (prof: ProfessionalType) => {
    setSelectedProfessional(prof);
    setSelectedTrend(null);
    setCurrentPage('consultant');
  };

  const handleTrendSelect = (trend: Trend) => {
    setSelectedProfessional(trend.targetProfessional);
    setSelectedTrend(trend);
    setCurrentPage('consultant');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onProfessionalSelect={handleProfessionalSelect} onTrendSelect={handleTrendSelect} />;
      case 'consultant':
        return <SmartConsultation
          professional={selectedProfessional}
          initialTrend={selectedTrend}
          onBack={() => setCurrentPage('home')}
          onSchedule={() => setCurrentPage('booking')}
        />;
      case 'studio':
        return <ImageStudio />;
      case 'chat':
        return <Chat />;
      case 'tts':
        return <TextToSpeech />;
      case 'loyalty':
        return <FidelidadePage />;
      case 'booking':
        return <SaloesPage />;
      case 'shop':
        return <ShopPage />;
      case 'login':
        return <LoginPage onLoginSuccess={() => setCurrentPage('home')} onRegisterClick={() => setCurrentPage('membership')} />;
      case 'membership':
        return <MembershipPage onPlanSelect={() => setCurrentPage('login')} />;
      case 'partner':
        return <PartnerPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'pro-dashboard':
        return <ProfessionalDashboardPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'live':
        return <LiveShoppingPage />;
      default:
        return <HomePage onProfessionalSelect={handleProfessionalSelect} onTrendSelect={handleTrendSelect} />;
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
