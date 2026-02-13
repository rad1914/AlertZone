import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LeftCard from '../components/LeftCard';
import LiveMap from '../components/LiveMap';
import RightColumn from '../components/RightColumn';

export default function WarRoomDashboard() {
  return (
    <div className="flex h-screen w-full bg-[#0b0c0e] text-gray-300 font-sans overflow-hidden selection:bg-red-500/30">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              WAR ROOM • Live Operations
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#1a1b1e] hover:bg-[#25262a] border border-gray-700 rounded-md text-xs text-gray-400 transition-colors">
                Geospatial Intelligence
              </button>
              <button className="px-4 py-2 bg-[#2d3a4b] hover:bg-[#37465a] text-cyan-400 border border-cyan-900/50 rounded-md text-xs font-medium shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-colors">
                Mission Briefing
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
            <LeftCard />
            <LiveMap />
            <RightColumn />
          </div>
        </div>
      </main>
    </div>
  );
}