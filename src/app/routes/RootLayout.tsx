import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Outlet } from 'react-router-dom';
import { GlobalAssistant } from '@/components/ai/GlobalAssistant';
import CartDrawer from '@/components/cart/CartDrawer';

const RootLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        <Outlet />
      </main>
      <GlobalAssistant />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default RootLayout;
