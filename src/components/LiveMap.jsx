import React from 'react';
import {
  Plus,
  Minus,
  Flame,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';
import MapMarker from './MapMarker';

export default function LiveMap() {
  return (
    <div className="col-span-5 bg-[#161719] rounded-xl border border-gray-800 flex flex-col overflow-hidden relative group">
      
      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <button className="w-8 h-8 bg-gray-900/90 text-white flex items-center justify-center rounded border border-gray-700 hover:bg-gray-800">
          <Plus size={16} />
        </button>
        <button className="w-8 h-8 bg-gray-900/90 text-white flex items-center justify-center rounded border border-gray-700 hover:bg-gray-800">
          <Minus size={16} />
        </button>
      </div>

      {/* Active Fire Badge */}
      <div className="absolute top-4 right-4 z-20 bg-gray-900/90 border border-gray-700 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs text-gray-300">
        <Flame size={12} className="text-red-500 fill-red-500" />
        <span>Fuego Activo</span>
        <ChevronRight size={12} className="rotate-90 ml-2" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#161719] z-10">
        <h3 className="font-semibold text-gray-200">LIVE MAP</h3>
        <MoreHorizontal size={16} className="text-gray-500" />
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#0e1013] overflow-hidden">
        
        {/* Background SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M-10 20 L40 40 L60 30 L110 50 M30 110 L40 40 M60 30 L70 -10 M0 80 L30 70 L90 80"
            stroke="#4a5568"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M10 10 L20 20 M80 90 L70 80"
            stroke="#2d3748"
            strokeWidth="0.5"
          />
        </svg>

        {/* Markers */}
        <div className="absolute inset-0">
          <MapMarker top="45%" left="55%" size="lg" pulse />
          <MapMarker top="30%" left="40%" size="sm" />
          <MapMarker top="60%" left="70%" size="sm" />
          <MapMarker top="65%" left="30%" size="sm" />
          <MapMarker top="30%" left="80%" size="sm" />
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-70">
          <div className="font-bold text-white text-[10px]">mapbox</div>
        </div>

        {/* Footer Tag */}
        <div className="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-0.5 text-[9px] text-gray-400 rounded">
          Top diaco df | ECOCE Sqaus | Tous les Lécs
        </div>
      </div>
    </div>
  );
}
