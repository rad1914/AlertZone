import React from 'react';
import { Settings, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800/50 flex items-center justify-between px-8 bg-[#0f1012]">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">AlertZone</h1>
        <div className="h-4 w-px bg-gray-700 mx-2"></div>
        <div className="text-xs tracking-wider font-medium text-gray-500 flex items-center gap-2">
          <span>WAR ROOM</span>
          <span className="text-gray-700">|</span>
          <span>OPERADOR: J. PÉREZ</span>
          <span className="text-gray-700">|</span>
          <span>ESTADO: <span className="text-red-500 font-bold">ALERTA MÁXIMA</span></span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Settings size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        <div className="relative">
          <Bell size={18} className="text-gray-400 cursor-pointer hover:text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
          <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </header>
  );
}
