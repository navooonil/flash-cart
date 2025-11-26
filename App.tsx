import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/ui/Header';
import { LandingPage } from './components/LandingPage';
import { CameraFeed } from './components/Scan/CameraFeed';
import { CartSidebar } from './components/Cart/CartSidebar';
import { ViewState } from './types';

const MainLayout = () => {
  const [view, setView] = useState<ViewState>('landing');
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onNavigate={setView} currentView={view} />
      
      <main className="flex-1 relative">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('scan')} />
        ) : (
          <div className="container mx-auto p-4 md:p-6 lg:max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50 mb-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-gray-800">Scanner Active</h2>
                      <p className="text-sm text-gray-500">Point at items to add to cart</p>
                    </div>
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-ping"></div>
                 </div>
                 <CameraFeed />
              </div>
              <div className="hidden lg:block lg:col-span-1">
                 {/* Desktop permanent sidebar */}
                 <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[calc(100vh-140px)]">
                    <CartSidebar variant="inline" />
                 </div>
              </div>
            </div>
            
            {/* Mobile Drawer (Handled inside CartSidebar component logic for mobile) */}
            <div className="lg:hidden">
               <CartSidebar variant="drawer" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}