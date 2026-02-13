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
