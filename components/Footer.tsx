
import React from 'react';
import { MENUS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e293b] text-slate-400 py-16 px-6 border-t border-slate-700 mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-xl font-black text-white tracking-tight uppercase">KPII Association</span>
            </div>
            <div className="space-y-3 text-[13px] leading-relaxed">
              <p>(05030) 서울시 광진구 자양강변길 115, STA타워</p>
              <p>Email: <span className="text-slate-200">ai@aag.co.kr</span></p>
              <p>사업자등록번호: 702-02-02660 | 에이아이어드바이저리그룹(AAG) 협회 운영기관</p>
              <p>협회장: 권원일 (STA테스팅컨설팅 대표) | 설립자: 강승원 (AAG)</p>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
               <h4 className="text-white font-black text-sm uppercase tracking-widest border-b border-slate-700 pb-2">Association</h4>
               <ul className="text-xs space-y-2 font-bold">
                  <li><button className="hover:text-kpia-orange">협회소개</button></li>
                  <li><button className="hover:text-kpia-orange">설립자소개</button></li>
                  <li><button className="hover:text-kpia-orange">회장사소개</button></li>
                  <li><button className="hover:text-kpia-orange">Contact us</button></li>
               </ul>
            </div>
            <div className="space-y-4">
               <h4 className="text-white font-black text-sm uppercase tracking-widest border-b border-slate-700 pb-2">Board</h4>
               <ul className="text-xs space-y-2 font-bold">
                  <li><button className="hover:text-kpia-orange">공지사항</button></li>
                  <li><button className="hover:text-kpia-orange">사회공헌활동</button></li>
                  <li><button className="hover:text-kpia-orange">자료실</button></li>
               </ul>
            </div>
            <div className="space-y-4">
               <h4 className="text-white font-black text-sm uppercase tracking-widest border-b border-slate-700 pb-2">Resources</h4>
               <ul className="text-xs space-y-2 font-bold">
                  <li><button className="hover:text-kpia-orange">회원사소개</button></li>
               </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase">
              COPYRIGHT © 한국프로세스혁신협회 ALL RIGHTS RESERVED.
           </p>
           <div className="flex gap-6 text-slate-500 text-lg">
              <a href="https://www.youtube.com/@kpiassociation" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.linkedin.com/company/korea-process-innovation-association/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <i className="fab fa-facebook hover:text-white cursor-pointer transition-colors"></i>
           </div>
        </div>
      </div>
    </footer>
  );
};
