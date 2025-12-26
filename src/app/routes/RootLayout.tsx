import React from 'react';
import { Outlet } from 'react-router-dom';
import { SupremeHeader } from '@/components/layout/SupremeHeader';
import { SupremeFooter } from '@/components/layout/SupremeFooter';
import { GlobalAssistant } from '@/components/ai/GlobalAssistant';
import CartDrawer from '@/components/cart/CartDrawer';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <SupremeHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        <Outlet />
      </main>
      <GlobalAssistant />
      <CartDrawer />
      <SupremeFooter />
    </div>
  );
};

export default RootLayout;
