import React from 'react';
import { DetectionResult } from '../../types';
import { Flame, Activity } from 'lucide-react';

interface DetectionOverlayProps {
  prediction: DetectionResult | null;
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="absolute top-4 left-4 right-4 z-20 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 border border-indigo-100">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-green-50">
            <div className="h-5 w-5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Identified Item</p>
            <p className="text-xl font-extrabold text-gray-900 leading-none tracking-tight">{prediction.label}</p>
          </div>
        </div>
        
        {prediction.nutrition && (
          <div className="md:ml-auto flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg shadow-sm">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="font-bold text-gray-700 text-sm">{prediction.nutrition.calories} kcal</span>
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg shadow-sm">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-600 text-sm">{prediction.nutrition.protein} protein</span>
             </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-1 absolute top-2 right-2 md:static">
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded">
             CONF: {Math.round(prediction.confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};