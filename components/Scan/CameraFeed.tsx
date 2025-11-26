import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../lib/db/products';
import { DetectionOverlay } from './DetectionOverlay';
import { DetectionResult } from '../../types';
import { Camera, RefreshCw, Volume2 } from 'lucide-react';

export const CameraFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addItem } = useCart();
  const [streamStarted, setStreamStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrediction, setLastPrediction] = useState<DetectionResult | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamStarted(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Camera access denied or unavailable.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!isSoundEnabled || !window.speechSynthesis) return;
    
    // Cancel previous speech to avoid queue buildup
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleMockDetect = (productId: string) => {
    const product = PRODUCTS[productId];
    if (product) {
      // Audio Feedback
      speak(`${product.displayName} added`);

      // Visual Feedback
      setLastPrediction({ 
        label: product.displayName, 
        confidence: 0.92 + Math.random() * 0.07, 
        timestamp: Date.now(),
        nutrition: product.nutrition
      });
      
      addItem(product);
      
      // Clear prediction after 3 seconds
      setTimeout(() => setLastPrediction(null), 3500);
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[calc(100vh-140px)] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 ring-4 ring-gray-900/5">
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <Camera className="w-12 h-12 mb-4 text-gray-500" />
          <p>{error}</p>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute top-4 right-4 z-30">
             <button 
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className={`p-2 rounded-full backdrop-blur-md transition-colors ${isSoundEnabled ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-300'}`}
             >
               <Volume2 className={`w-5 h-5 ${!isSoundEnabled && 'opacity-50'}`} />
             </button>
          </div>

          <DetectionOverlay prediction={lastPrediction} />
          
          {/* Simulation Controls (Debug UI) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full px-4 z-30">
            <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 w-full max-w-sm shadow-xl">
              <p className="text-white/60 text-[10px] text-center mb-2 font-mono flex items-center justify-center gap-2 uppercase tracking-widest">
                <RefreshCw className="w-3 h-3" /> Simulate AI Detection
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(PRODUCTS).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleMockDetect(p.id)}
                    className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 active:bg-indigo-600 active:scale-95 text-indigo-100 text-xs font-medium rounded-lg transition-all border border-indigo-500/30 backdrop-blur-sm"
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};