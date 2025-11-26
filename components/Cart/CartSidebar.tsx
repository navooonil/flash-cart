import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { getBestPrice, formatCurrency } from '../../utils/priceUtils';
import { X, ShoppingBag, Wallet, AlertCircle, ArrowRight, Store } from 'lucide-react';
import { Button } from '../ui/Button';

interface CartSidebarProps {
  variant?: 'drawer' | 'inline';
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ variant = 'drawer' }) => {
  const { cart, isCartOpen, toggleCart, budget, setBudget } = useCart();
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  // 1. Calculate Standard Total (Mixed best prices)
  const currentTotal = cart.reduce((sum, item) => {
    return sum + (getBestPrice(item.prices).price * item.qty);
  }, 0);

  // 2. Smart Store Logic: Calculate total if bought entirely from one store
  const storeTotals: Record<string, number> = { "Blinkit": 0, "Zepto": 0, "Instamart": 0 };
  
  cart.forEach(item => {
    item.prices.forEach(sp => {
      if (storeTotals[sp.store] !== undefined) {
        storeTotals[sp.store] += sp.price * item.qty;
      }
    });
  });

  // Find cheapest single store
  let bestSingleStore = "Blinkit";
  let bestSinglePrice = Infinity;

  Object.entries(storeTotals).forEach(([store, total]) => {
     if (total > 0 && total < bestSinglePrice) {
        bestSinglePrice = total;
        bestSingleStore = store;
     }
  });

  // 3. Budget Logic
  const budgetPercent = Math.min(100, (currentTotal / budget) * 100);
  const isOverBudget = currentTotal > budget;
  
  // Progress Bar Color
  let progressColor = "bg-green-500";
  if (budgetPercent > 75) progressColor = "bg-yellow-500";
  if (budgetPercent >= 100) progressColor = "bg-red-500";


  // If drawer mode, handle visibility via isCartOpen
  if (variant === 'drawer' && !isCartOpen) return null;

  const containerClasses = variant === 'drawer' 
    ? "fixed top-0 right-0 bottom-0 w-full md:w-96 bg-gray-50 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-gray-200"
    : "w-full h-full bg-gray-50 flex flex-col";

  return (
    <>
      {variant === 'drawer' && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleCart}
        />
      )}
      <div className={containerClasses}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            Your Cart
          </h2>
          {variant === 'drawer' && (
            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Budget Tracker Section */}
        <div className="bg-white px-5 py-3 border-b border-gray-100 shrink-0">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                 <Wallet className="w-4 h-4 text-gray-400" />
                 <span>Budget Goal</span>
              </div>
              {isEditingBudget ? (
                 <div className="flex items-center gap-1">
                   <input 
                     type="number" 
                     className="w-20 px-2 py-1 text-sm border rounded"
                     value={budget}
                     onChange={(e) => setBudget(Number(e.target.value))}
                     autoFocus
                     onBlur={() => setIsEditingBudget(false)}
                   />
                   <span className="text-xs text-gray-400">INR</span>
                 </div>
              ) : (
                 <button 
                   onClick={() => setIsEditingBudget(true)}
                   className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
                 >
                   {formatCurrency(budget)}
                 </button>
              )}
           </div>
           
           <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progressColor} transition-all duration-500`} 
                style={{ width: `${budgetPercent}%` }}
              />
           </div>
           
           <div className="flex justify-between mt-1.5 text-xs text-gray-400">
              <span>Spent: {formatCurrency(currentTotal)}</span>
              <span className={isOverBudget ? "text-red-500 font-bold" : ""}>
                 {isOverBudget ? "Over Budget!" : `${Math.round(100 - budgetPercent)}% left`}
              </span>
           </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="bg-gray-100 p-6 rounded-full">
                  <ShoppingBag className="w-12 h-12 opacity-30" />
              </div>
              <p className="text-sm font-medium">Your cart is empty.</p>
              {variant === 'drawer' && (
                <Button variant="outline" size="sm" onClick={toggleCart}>Start Scanning</Button>
              )}
            </div>
          ) : (
            <>
                {cart.map(item => (
                <CartItem key={item.id} item={item} />
                ))}
                
                {/* Smart Recommendation Card */}
                {cart.length > 1 && (
                    <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -mr-8 -mt-8 opacity-50 blur-xl"></div>
                       
                       <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3 relative z-10">
                          <Store className="w-4 h-4 text-indigo-600" />
                          Smart Optimizer
                       </h3>
                       
                       <div className="space-y-2 relative z-10">
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Cheapest Mix:</span>
                              <span className="font-bold text-gray-900">{formatCurrency(currentTotal)}</span>
                           </div>
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-600">All from {bestSingleStore}:</span>
                              <span className="font-medium text-gray-900">{formatCurrency(bestSinglePrice)}</span>
                           </div>
                           
                           <div className="pt-2 mt-2 border-t border-indigo-100">
                              {bestSinglePrice <= currentTotal + 20 ? ( // Tolerance of 20
                                  <p className="text-xs text-green-700 leading-relaxed">
                                     <strong>Recommendation:</strong> Buy everything from <span className="underline decoration-green-300">{bestSingleStore}</span>. It's almost the same price and saves you multiple delivery fees!
                                  </p>
                              ) : (
                                  <p className="text-xs text-indigo-700 leading-relaxed">
                                     <strong>Tip:</strong> Splitting your order saves you <strong>{formatCurrency(bestSinglePrice - currentTotal)}</strong> compared to buying only from {bestSingleStore}.
                                  </p>
                              )}
                           </div>
                       </div>
                    </div>
                )}
            </>
          )}
        </div>

        {/* Footer Totals */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t space-y-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 text-sm">Estimated Total</span>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">{formatCurrency(currentTotal)}</span>
            </div>
            <Button className="w-full group" size="lg">
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};