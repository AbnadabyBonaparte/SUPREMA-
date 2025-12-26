import React from 'react';
import { Outlet } from 'react-router-dom';
import { SupremeHeader } from '@/components/layout/SupremeHeader';
import { SupremeFooter } from '@/components/layout/SupremeFooter';
import { GlobalAssistant } from '@/components/ai/GlobalAssistant';
import CartDrawer from '@/components/cart/CartDrawer';

const RootLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SupremeHeader />
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        <Outlet />
      </main>
      <GlobalAssistant />
      <CartDrawer />
      <SupremeFooter />
    </div>
  );
};

export default RootLayout;
