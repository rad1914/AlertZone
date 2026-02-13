import React from 'react';
import TrafficLight from './TrafficLight';

export default function LeftCard() {
  return (
    <div className="col-span-3 bg-[#0f1012] rounded-xl border border-red-900/30 relative overflow-hidden flex flex-col shadow-[0_0_50px_-10px_rgba(220,38,38,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

      <div className="p-6 flex flex-col items-center flex-1 relative z-10">
        <h3 className="text-white font-bold tracking-wider mb-8 text-sm uppercase">NUEVA INCIDENCIA</h3>

        <TrafficLight />

        <div className="text-center mt-2 mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Fuego Activo</h2>
          <p className="text-gray-400 text-sm">Volcán de Colima</p>
        </div>

        <div className="w-full bg-[#161719] rounded-lg p-4 space-y-3 border border-gray-800">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <span className="text-gray-400 text-sm">Gravedad:</span>
            <span className="text-orange-500 font-bold text-sm">Alta</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <span className="text-gray-400 text-sm">Recursos Desplegados:</span>
            <span className="text-white font-mono text-sm">3 Unidades</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Tiempo Estimado:</span>
            <span className="text-white font-mono text-sm">5 min</span>
          </div>
        </div>

        <button className="mt-auto w-full py-3 bg-gradient-to-r from-red-900/80 to-red-800/80 hover:from-red-800 hover:to-red-700 text-red-100 rounded-lg text-sm font-medium border border-red-700/50 shadow-lg transition-all">
          Nuevas incidencias
        </button>
      </div>
    </div>
  );
}
