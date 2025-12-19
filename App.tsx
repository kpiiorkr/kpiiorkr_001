import React, { useState } from 'react';
import { useApp } from './store.ts';
import { MenuType } from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Home } from './pages/Home.tsx';
import { BBSPage } from './pages/BBSPage.tsx';
import { About } from './pages/About.tsx';
import { Founder } from './pages/Founder.tsx';
import { Chairman } from './pages/Chairman.tsx';
import { Contact } from './pages/Contact.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { ExternalNoticePage } from './pages/ExternalNoticePage.tsx';
import { ExternalActivityPage } from './pages/ExternalActivityPage.tsx';
import { ExternalResourcePage } from './pages/ExternalResourcePage.tsx';

const App: React.FC = () => {
  const { settings, isAdmin, toggleSidebar } = useApp();
  const [currentMenu, setCurrentMenu] = useState<MenuType | 'HOME' | 'ADMIN'>('HOME');

  const renderContent = () => {
    if (currentMenu === 'HOME') return <Home onNavigate={setCurrentMenu} />;
    if (currentMenu === 'ADMIN') return <AdminPanel />;
    if (currentMenu === '협회소개') return <About />;
    if (currentMenu === '설립자소개') return <Founder />;
    if (currentMenu === '회장사소개') return <Chairman />;
    if (currentMenu === 'Contact us') return <Contact />;
    
    // 외부 연동 게시판 처리 (iframe 방식)
    if (currentMenu === '공지사항') return <ExternalNoticePage />;
    if (currentMenu === '사회공헌활동') return <ExternalActivityPage />;
    if (currentMenu === '자료실') return <ExternalResourcePage />;
    
    return <BBSPage category={currentMenu} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentMenu={currentMenu} onNavigate={setCurrentMenu} />
      
      <div className="flex-1 flex w-full max-w-[1400px] mx-auto relative">
        {!settings.showSidebar && (
          <button 
            onClick={toggleSidebar}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] bg-kpia-orange border border-l-0 border-white text-white rounded-r-2xl p-4 shadow-[10px_0_30px_rgba(253,124,35,0.3)] hover:pl-6 transition-all flex flex-col items-center gap-2 group animate-in slide-in-from-left duration-300"
            title="메뉴 열기"
          >
            <i className="fas fa-bars text-xl"></i>
            <span className="text-[11px] font-black [writing-mode:vertical-lr] tracking-[0.2em] uppercase py-2">Open Menu</span>
          </button>
        )}

        {settings.showSidebar && (
          <aside className="hidden md:block w-64 border-r border-gray-100 bg-white flex-shrink-0 sticky top-[100px] h-[calc(100vh-100px)]">
            <Sidebar currentMenu={currentMenu} onNavigate={setCurrentMenu} />
          </aside>
        )}
        
        <main className={`flex-1 transition-all duration-300 ${settings.showSidebar ? '' : 'w-full'}`}>
          <div className="p-4 md:p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;