import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Zap } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'landing' | 'scan') => void;
  currentView: 'landing' | 'scan';
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const { cart, toggleCart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            FlashCart
          </span>
        </div>

        <div className="flex items-center gap-4">
          {currentView === 'landing' && (
            <button 
              onClick={() => onNavigate('scan')}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Start Scanning
            </button>
          )}
          
          <button 
            onClick={toggleCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};