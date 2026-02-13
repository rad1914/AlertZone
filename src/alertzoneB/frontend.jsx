// @path: frontend.jsx
import React from 'react';
import WarRoomDashboard from './pages/WarRoomDashboard';

export default function App() {
  return <WarRoomDashboard />;
}import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
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
}import React from 'react';
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
              Tactical Operations Center
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#1a1b1e] hover:bg-[#25262a] border border-gray-700 rounded-md text-xs text-gray-400 transition-colors">
                Geospatial Intelligence
              </button>
              <button className="px-4 py-2 bg-[#2d3a4b] hover:bg-[#37465a] text-cyan-400 border border-cyan-900/50 rounded-md text-xs font-medium shadow-[0_0_10px_rgba(34,211,238,0.1)] transition-colors">
                Deploy Recon Units
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
}import React from 'react';
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

      {}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <button className="w-8 h-8 bg-gray-900/90 text-white flex items-center justify-center rounded border border-gray-700 hover:bg-gray-800">
          <Plus size={16} />
        </button>
        <button className="w-8 h-8 bg-gray-900/90 text-white flex items-center justify-center rounded border border-gray-700 hover:bg-gray-800">
          <Minus size={16} />
        </button>
      </div>

      {}
      <div className="absolute top-4 right-4 z-20 bg-gray-900/90 border border-gray-700 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs text-gray-300">
        <Flame size={12} className="text-red-500 fill-red-500" />
        <span>Fuego Activo</span>
        <ChevronRight size={12} className="rotate-90 ml-2" />
      </div>

      {}
      <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#161719] z-10">
        <h3 className="font-semibold text-gray-200">LIVE MAP</h3>
        <MoreHorizontal size={16} className="text-gray-500" />
      </div>

      {}
      <div className="flex-1 relative bg-[#0e1013] overflow-hidden">

        {}
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

        {}
        <div className="absolute inset-0">
          <MapMarker top="45%" left="55%" size="lg" pulse />
          <MapMarker top="30%" left="40%" size="sm" />
          <MapMarker top="60%" left="70%" size="sm" />
          <MapMarker top="65%" left="30%" size="sm" />
          <MapMarker top="30%" left="80%" size="sm" />
        </div>

        {}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-70">
          <div className="font-bold text-white text-[10px]">mapbox</div>
        </div>

        {}
        <div className="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-0.5 text-[9px] text-gray-400 rounded">
          Top diaco df | ECOCE Sqaus | Tous les Lécs
        </div>
      </div>
    </div>
  );
}
function Row({ label, value, valueClass }) {
  return (
    <div className="flex justify-between text-gray-400">
      <span>{label}:</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

export default function LeftCard() {
  return (
    <div className="col-span-3 bg-[#0f1012] rounded-xl border border-red-900/30 p-6 flex flex-col">
      <h3 className="text-white text-sm font-bold uppercase text-center mb-6">
        NUEVA INCIDENCIA
      </h3>

      <div className="text-2xl text-center mb-4">🔴</div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Fuego Activo</h2>
        <p className="text-gray-400 text-sm">Volcán de Colima</p>
      </div>

      <div className="bg-[#161719] rounded-lg p-4 text-sm space-y-2">
        <Row label="Gravedad" value="Alta" valueClass="text-orange-500 font-bold" />
        <Row label="Recursos" value="3 Unidades" valueClass="text-white font-mono" />
        <Row label="ETA" value="5 min" valueClass="text-white font-mono" />
      </div>

      <button className="mt-6 py-3 bg-red-800 hover:bg-red-700 text-red-100 rounded-lg text-sm font-medium">
        Nuevas incidencias
      </button>
    </div>
  );
}import React from 'react';
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
import React from 'react';
import { LayoutGrid, Trees, Building2, Wrench, Settings, LogOut, TriangleAlert } from 'lucide-react';
import SidebarIcon from './SidebarIcon';

export default function Sidebar() {
  return (
    <aside className="w-20 border-r border-gray-800/50 flex flex-col items-center py-6 bg-[#0f1012]">
      <div className="mb-8">
        <TriangleAlert className="text-orange-500" size={32} />
      </div>

      <nav className="flex-1 w-full flex flex-col items-center px-2">
        <SidebarIcon icon={LayoutGrid} active={true} />
        <SidebarIcon icon={Trees} />
        <SidebarIcon icon={Building2} />
        <SidebarIcon icon={Wrench} />
        <SidebarIcon icon={Settings} />
      </nav>

      <div className="mt-auto">
        <SidebarIcon icon={LogOut} />
      </div>
    </aside>
  );
}
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
}import React from 'react';

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
}import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AlertRow({ icon: Icon, title, subtitle, type = 'warning', active = false }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer border ${active ? 'bg-[#2a1e1e] border-l-4 border-l-red-500 border-y-[#2a1e1e] border-r-[#2a1e1e]' : 'bg-[#1e1e1e] border-transparent hover:bg-[#252525]'}`}>
      <div className="flex items-center gap-3">
        <div className={`${type === 'danger' ? 'text-red-500' : 'text-orange-400'}`}>
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-gray-200 text-sm font-medium">{title}</h4>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-600" />
    </div>
  );
}
import { useEffect, useState } from 'react';
import { TriangleAlert, MoreHorizontal } from 'lucide-react';
import AlertRow from './AlertRow';
import SensorRow from './SensorRow';

export default function RightColumn() {
  const [alerts, setAlerts] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/alerts')
      .then((r) => r.json())
      .then(setAlerts)
      .catch(() => setAlerts([]));

    fetch('http://localhost:3001/api/sensors')
      .then((r) => r.json())
      .then(setSensors)
      .catch(() => setSensors([]));
  }, []);

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <Section title="REAL TIME DATA" action={<MoreHorizontal size={16} className="text-gray-500" />}>
        {alerts.map((a) => (
          <AlertRow key={a.id} icon={TriangleAlert} {...a} />
        ))}
      </Section>

      <Section title="Sensors" className="h-1/3">
        {sensors.map((s) => (
          <SensorRow key={s.id} {...s} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, action, className = '', children }) {
  return (
    <div className={`bg-[#0f1012] rounded-xl border border-gray-800 p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-200">{title}</h3>
        {action}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
export default function SidebarIcon({ icon: Icon, active }) {
  return (
    <div
      className={`p-3 rounded-xl mb-4 cursor-pointer transition-all ${
        active
          ? 'bg-[#2a1e1e] text-[#ff4d4d]'
          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
    >
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    </div>
  );
}
