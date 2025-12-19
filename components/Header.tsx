
import React from 'react';
import { useApp } from '../store';
import { MenuType } from '../types';
import { MENUS } from '../constants';

interface HeaderProps {
  currentMenu: MenuType | 'HOME' | 'ADMIN';
  onNavigate: (menu: MenuType | 'HOME' | 'ADMIN') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMenu, onNavigate }) => {
  const { isAdmin, setIsAdmin, settings } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#f8fafc] py-1.5 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-center items-center text-[11px] text-slate-400 font-bold tracking-wider relative">
          <div className="flex gap-4 items-center">
            <span className="text-kpia-gray">한국프로세스혁신협회 홈페이지에 오신 것을 환영합니다.</span>
          </div>
          <div className="absolute right-6 flex gap-5 items-center">
            {isAdmin ? (
              <>
                <button onClick={() => onNavigate('ADMIN')} className="text-kpia-orange">Admin Panel</button>
                <button onClick={() => { setIsAdmin(false); onNavigate('HOME'); }} className="hover:text-kpia-orange ml-4">Logout</button>
              </>
            ) : (
              <button onClick={() => onNavigate('ADMIN')} className="hover:text-kpia-orange">Admin Login</button>
            )}
            <span className="w-[1px] h-3 bg-gray-200 mx-4"></span>
            <button className="hover:text-kpia-orange">English</button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('HOME')}>
          <div className="h-14 md:h-16 overflow-hidden flex items-center">
             <img 
               src={settings.logoImageUrl || 'https://i.ibb.co/v6y8H3m/kpia-logo.png'} 
               alt="한국프로세스혁신협회 로고" 
               className="h-full object-contain"
             />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {MENUS.map(menu => (
            <button
              key={menu}
              onClick={() => onNavigate(menu)}
              className={`px-4 py-2 text-[14px] font-bold transition-all ${
                currentMenu === menu ? 'text-kpia-orange border-b-2 border-kpia-orange' : 'text-slate-600 hover:text-kpia-orange'
              }`}
            >
              {menu}
            </button>
          ))}
        </nav>

        <div className="lg:hidden flex items-center">
           <button className="text-2xl p-2 text-kpia-orange" onClick={() => onNavigate('HOME')}>
             <i className="fas fa-bars"></i>
           </button>
        </div>
      </div>
    </header>
  );
};
