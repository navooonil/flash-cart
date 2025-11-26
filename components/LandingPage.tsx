import React from 'react';
import { Button } from './ui/Button';
import { Zap, Scan, TrendingDown, ShoppingCart } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center p-6 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2574')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-indigo-50/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
          <Zap className="w-4 h-4 fill-indigo-500" />
          <span>The future of grocery shopping</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          Shop Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">FlashCart</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
          Point your camera at any grocery item. We'll identify it and find the best price across Blinkit, Zepto, and Instamart instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button onClick={onStart} size="lg" className="w-full sm:w-auto text-lg px-8 shadow-xl shadow-indigo-200">
            Start Scanning Now
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur">
            View Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          {[
            { icon: Scan, title: "AI Detection", desc: "Instant object recognition directly in your browser." },
            { icon: TrendingDown, title: "Price Compare", desc: "Real-time comparison across quick-commerce apps." },
            { icon: ShoppingCart, title: "Smart Cart", desc: "Auto-syncing cart that tracks your total savings." }
          ].map((feature, i) => (
            <div key={i} className="bg-white/60 backdrop-blur p-4 rounded-xl border border-white shadow-sm">
              <feature.icon className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};