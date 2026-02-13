import React from 'react';

export default function MapMarker({ top, left, pulse = false, size = 'md' }) {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      {pulse && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>}
      <div className={`relative rounded-full bg-red-600/20 flex items-center justify-center border border-red-500 ${size === 'lg' ? 'w-16 h-16 shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'w-8 h-8'}`}>
        <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
}