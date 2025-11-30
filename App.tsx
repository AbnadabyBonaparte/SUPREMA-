import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import * as Pages from './src/pages/HomePage';
import * as LoginPageModule from './src/pages/LoginPage';
import * as DashboardPageModule from './src/pages/DashboardPage';
import * as FidelidadePageModule from './src/pages/FidelidadePage';
import * as MembershipPageModule from './src/pages/MembershipPage';
import * as ProfilePageModule from './src/pages/ProfilePage';
import * as SaloesPageModule from './src/pages/SaloesPage';
import * as ShopPageModule from './src/pages/ShopPage';
import * as PartnerPageModule from './src/pages/PartnerPage';
import * as ProfessionalDashboardPageModule from './src/pages/ProfessionalDashboardPage';
import * as CheckoutPageModule from './src/pages/CheckoutPage';
import * as SustainabilityPageModule from './src/pages/SustainabilityPage';
import * as LiveShoppingPageModule from './src/pages/LiveShoppingPage';
import SmartConsultation from './src/components/ai/SmartConsultation';
import { ImageStudio } from './src/components/ai/ImageStudio';
import { Chat } from './src/components/ai/Chat';
import TextToSpeech from './components/TextToSpeech';
import CartDrawer from './src/components/cart/CartDrawer';
import { GlobalAssistant } from './src/components/ai/GlobalAssistant';
import { ProfessionalType, Trend } from './types';

const HomePage = Pages.default || Pages;
const LoginPage = LoginPageModule.default || LoginPageModule;
const DashboardPage = DashboardPageModule.default || DashboardPageModule;
const FidelidadePage = FidelidadePageModule.default || FidelidadePageModule;
const MembershipPage = MembershipPageModule.default || MembershipPageModule;
const ProfilePage = ProfilePageModule.default || ProfilePageModule;
const SaloesPage = SaloesPageModule.default || SaloesPageModule;
const ShopPage = ShopPageModule.default || ShopPageModule;
const PartnerPage = PartnerPageModule.default || PartnerPageModule;
const ProfessionalDashboardPage = ProfessionalDashboardPageModule.default || ProfessionalDashboardPageModule;
const CheckoutPage = CheckoutPageModule.default || CheckoutPageModule;
const SustainabilityPage = SustainabilityPageModule.default || SustainabilityPageModule;
const LiveShoppingPage = LiveShoppingPageModule.default || LiveShoppingPageModule;

type Page = 
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
  | 'consultant'
  | 'studio'
  | 'chat'
  | 'tts';

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
        return React.createElement(HomePage as any, { onProfessionalSelect: handleProfessionalSelect, onTrendSelect: handleTrendSelect });
      case 'consultant':
        return (
          <SmartConsultation
            professional={selectedProfessional}
            initialTrend={selectedTrend}
            onBack={() => setCurrentPage('home')}
            onSchedule={() => setCurrentPage('saloes')}
          />
        );
      case 'studio':
        return <ImageStudio />;
      case 'chat':
        return <Chat />;
      case 'tts':
        return <TextToSpeech />;
      case 'fidelidade':
        return React.createElement(FidelidadePage as any);
      case 'saloes':
        return React.createElement(SaloesPage as any);
      case 'shop':
        return React.createElement(ShopPage as any);
      case 'login':
        return React.createElement(LoginPage as any, { onLoginSuccess: () => setCurrentPage('dashboard') });
      case 'membership':
        return React.createElement(MembershipPage as any);
      case 'partner':
        return React.createElement(PartnerPage as any);
      case 'dashboard':
        return React.createElement(DashboardPage as any);
      case 'profile':
        return React.createElement(ProfilePage as any);
      case 'pro-dashboard':
        return React.createElement(ProfessionalDashboardPage as any);
      case 'checkout':
        return React.createElement(CheckoutPage as any);
      case 'sustainability':
        return React.createElement(SustainabilityPage as any);
      case 'live':
        return React.createElement(LiveShoppingPage as any);
      default:
        return React.createElement(HomePage as any, { onProfessionalSelect: handleProfessionalSelect, onTrendSelect: handleTrendSelect });
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
