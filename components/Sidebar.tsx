
import React from 'react';
import { useApp } from '../store';
import { MenuType } from '../types';
import { MENUS } from '../constants';

interface SidebarProps {
  currentMenu: MenuType | 'HOME' | 'ADMIN';
  onNavigate: (menu: MenuType | 'HOME' | 'ADMIN') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentMenu, onNavigate }) => {
  const { toggleSidebar, settings } = useApp();

  return (
    <div className="flex flex-col h-full py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-slate-800 font-black text-xl tracking-tighter">MENU</h2>
          <div className="h-1 w-8 bg-kpia-orange rounded mt-1"></div>
        </div>
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-200 flex items-center justify-center text-slate-400 hover:text-kpia-orange transition-colors"
          title="사이드바 접기"
        >
          <i className="fas fa-indent"></i>
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {MENUS.map(menu => (
          <button
            key={menu}
            onClick={() => onNavigate(menu)}
            className={`text-left px-5 py-3.5 rounded-xl transition-all text-[14px] font-bold ${
              currentMenu === menu 
                ? 'bg-kpia-orange text-white shadow-lg shadow-orange-100 transform translate-x-2' 
                : 'text-slate-500 hover:bg-orange-50 hover:text-kpia-orange'
            }`}
          >
            {menu}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-10">
        <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Process Innovation</p>
           <p className="text-sm font-bold leading-snug">기업의 프로세스를<br/>혁신합니다.</p>
           <div className="mt-4 flex gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-kpia-orange"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-kpia-yellow"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-kpia-gray"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
