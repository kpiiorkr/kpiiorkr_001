
import React, { useState, useEffect } from 'react';
import { useApp } from '../store.ts';
import { MenuType } from '../types.ts';

interface HomeProps {
  onNavigate: (menu: MenuType | 'HOME' | 'ADMIN') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { settings } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const rollingImages = settings.rollingImages || [];

  useEffect(() => {
    if (rollingImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rollingImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [rollingImages.length]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* 1. Hero Banner Section */}
      <section className="relative h-[350px] md:h-[500px] bg-slate-200 rounded-[50px] overflow-hidden shadow-2xl group">
        {rollingImages.length > 0 ? rollingImages.map((img, idx) => (
          <div 
            key={img.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          >
            <img src={img.url} className="w-full h-full object-cover" alt="banner" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-12 left-8 md:left-20 text-white max-w-4xl">
              <p className="text-kpia-orange font-black text-xs uppercase tracking-[0.4em] mb-3">Better Process, Better Innovation</p>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter drop-shadow-2xl leading-[1.1]">
                Revolutionize Your<br/>Business Future
              </h2>
              <button 
                onClick={() => onNavigate('협회소개')}
                className="bg-kpia-orange text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl"
              >
                Learn More
              </button>
            </div>
          </div>
        )) : (
          <div className="flex items-center justify-center h-full bg-slate-800 text-white/20 text-xl font-black italic">
            KPII INNOVATION
          </div>
        )}
        <div className="absolute bottom-10 right-12 flex gap-2">
          {rollingImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'bg-kpia-orange w-10' : 'bg-white/30 w-1.5 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Welcome Intro */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-kpia-orange opacity-20"></div>
          <div className="space-y-4">
            <h3 className="text-[15px] md:text-base font-black text-slate-800 tracking-tight leading-tight">
              한국프로세스혁신협회 홈페이지를 방문해주신 여러분을 진심으로 환영합니다.
            </h3>
            <p className="text-[12px] md:text-[13px] text-slate-500 font-medium leading-relaxed text-justify">
              일 자체의 혁신, 디지털을 이용한 혁신, 조직 문화의 혁신 등 모든 업무에 대한 개선과 발전을 주제로, 고착화 된 비효율을 제거하고 프로세스를 개선하는 토론과 공유의 장을 지향합니다. 협회가 조직 경영과 업무 혁신에 도움이 되는 소중한 장이 되기를 바라며 여러분의 믿음직한 동반자가 되도록 최선을 다하겠습니다.
            </p>
            <div className="pt-3 border-t border-slate-50 flex justify-end">
              <p className="text-[11px] font-black text-slate-800">
                한국프로세스혁신협회 설립자 <span className="text-kpia-orange ml-1">강 승 원</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Cards Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
           <div className="h-1"></div>
           <button onClick={() => onNavigate('자료실')} className="text-xs font-black text-kpia-orange flex items-center gap-2 group">
              VIEW RESOURCES <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               title: 'Process Innovation', 
               icon: 'fa-project-diagram', 
               color: 'text-blue-500', 
               bg: 'bg-blue-50',
               desc: '데이터 기반의 프로세스 분석을 통해 업무의 가시성을 확보하고 비효율을 제거합니다.' 
             },
             { 
               title: 'Intelligent AI', 
               icon: 'fa-microchip', 
               color: 'text-kpia-orange', 
               bg: 'bg-orange-50',
               desc: '생성형 AI와 자동화 기술을 결합하여 지능형 업무 환경으로의 전환을 주도합니다.' 
             },
             { 
               title: 'Expert Network', 
               icon: 'fa-globe-asia', 
               color: 'text-slate-700', 
               bg: 'bg-slate-100',
               desc: '산업별 최고의 전문가들과 네트워크를 구축하여 혁신 사례와 지식을 공유합니다.' 
             }
           ].map((item, i) => (
             <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
                   <i className={`fas ${item.icon}`}></i>
                </div>
                <h5 className="text-xl font-black text-slate-800 mb-4">{item.title}</h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <i className="fas fa-arrow-right text-[10px] text-kpia-orange"></i>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Social Media Connection Section */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <a 
            href="https://www.youtube.com/@kpiassociation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FF0000] p-12 rounded-[50px] shadow-2xl flex items-center justify-between text-white group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <i className="fab fa-youtube text-[180px]"></i>
            </div>
            <div className="relative z-10">
               <span className="text-white/60 font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">Official YouTube</span>
               <h4 className="text-3xl font-black mb-4">YouTube 채널</h4>
               <p className="text-white/80 font-bold mb-8 text-sm">
                 한국프로세스혁신협회의 영상 컨텐츠
               </p>
               <div className="flex items-center gap-3 bg-white text-[#FF0000] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest inline-flex group-hover:pr-10 transition-all">
                  채널 방문 <i className="fas fa-play text-[10px]"></i>
               </div>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/company/korea-process-innovation-association/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0077B5] p-12 rounded-[50px] shadow-2xl flex items-center justify-between text-white group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <i className="fab fa-linkedin text-[180px]"></i>
            </div>
            <div className="relative z-10">
               <span className="text-white/60 font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">Professional Network</span>
               <h4 className="text-3xl font-black mb-4">LinkedIn 커뮤니티</h4>
               <p className="text-white/80 font-bold mb-8 text-sm">
                 글로벌 비즈니스 리더들과 함께하는<br/>혁신 네트워크에 참여하세요.
               </p>
               <div className="flex items-center gap-3 bg-white text-[#0077B5] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest inline-flex group-hover:pr-10 transition-all">
                  팔로우 <i className="fas fa-plus text-[10px]"></i>
               </div>
            </div>
          </a>
        </div>
      </section>

      {/* 5. Quick Inquiry CTA */}
      <section className="bg-slate-900 py-20 px-10 rounded-[60px] text-center border border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
         <h4 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10">혁신을 향한 여정, 함께 만들어 갑니다.</h4>
         <p className="text-white/40 font-medium mb-10 max-w-2xl mx-auto text-sm relative z-10">
            기업의 가치를 높이는 프로세스 혁신의 길, 한국프로세스혁신협회가 귀사의 든든한 동반자가 되어 드립니다.
         </p>
         <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button 
              onClick={() => onNavigate('Contact us')}
              className="bg-kpia-orange text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20"
            >
              제휴 및 문의
            </button>
            <button 
              onClick={() => onNavigate('회원사소개')}
              className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              회원사 소개
            </button>
         </div>
      </section>
    </div>
  );
};
