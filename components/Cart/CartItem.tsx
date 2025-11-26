import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { getBestPrice, formatCurrency } from '../../utils/priceUtils';
import { Trash2, Plus, Minus, TrendingDown, ImageOff } from 'lucide-react';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { updateQty, removeItem } = useCart();
  const bestDeal = getBestPrice(item.prices);
  
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm mb-3 transition-all hover:shadow-md">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="h-20 w-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 relative group">
            {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.displayName} 
                  className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                    <ImageOff className="w-6 h-6" />
                </div>
            )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate leading-tight">{item.displayName}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
              <button 
                onClick={() => updateQty(item.id, -1)}
                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-4 text-center tabular-nums">{item.qty}</span>
              <button 
                onClick={() => updateQty(item.id, 1)}
                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-indigo-600 transition-all hover:scale-110 active:scale-95"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900 leading-none">
                {formatCurrency(bestDeal.price * item.qty)}
              </div>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-green-100 font-medium">
                  <TrendingDown className="w-3 h-3" />
                  {bestDeal.store}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};