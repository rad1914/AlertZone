import React from 'react';

export default function SensorRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-gray-400 text-xs font-medium">{label}</span>
      </div>
      <span className="text-gray-200 text-sm font-mono">{value}</span>
    </div>
  );
}