import React from 'react';
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
