
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MatrixHub from './components/MatrixHub';
import SmartConsultation from './components/SmartConsultation';
import ImageStudio from './components/ImageStudio';
import Chat from './components/Chat';
import TextToSpeech from './components/TextToSpeech';
import LoyaltyDashboard from './components/LoyaltyDashboard';
import BookingSystem from './components/BookingSystem';
import Shop from './components/Shop';
import GlobalAssistant from './components/GlobalAssistant';
import Login from './components/Login';
import Membership from './components/Membership';
import PartnerProgram from './components/PartnerProgram';
import { ProfessionalType, Trend } from './types';

type Page = 'home' | 'consultant' | 'studio' | 'chat' | 'tts' | 'loyalty' | 'booking' | 'shop' | 'login' | 'membership' | 'partner';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalType>('barber_x0');
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  const handleProfessionalSelect = (prof: ProfessionalType) => {
      setSelectedProfessional(prof);
      setSelectedTrend(null); // Reset trend
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
        return <MatrixHub onSelect={handleProfessionalSelect} onSelectTrend={handleTrendSelect} />;
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
          return <LoyaltyDashboard />;
      case 'booking':
          return <BookingSystem />;
      case 'shop':
          return <Shop />;
      case 'login':
          return <Login onLoginSuccess={() => setCurrentPage('home')} onRegisterClick={() => setCurrentPage('membership')} />;
      case 'membership':
          return <Membership onPlanSelect={() => setCurrentPage('login')} />;
      case 'partner':
          return <PartnerProgram />;
      default:
        return <MatrixHub onSelect={handleProfessionalSelect} onSelectTrend={handleTrendSelect} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        {renderPage()}
      </main>

      {/* AURA: INTELIGÊNCIA GLOBAL FLUTUANTE */}
      <GlobalAssistant currentPage={currentPage} onNavigate={setCurrentPage} />

      <Footer />
    </div>
  );
};

export default App;
