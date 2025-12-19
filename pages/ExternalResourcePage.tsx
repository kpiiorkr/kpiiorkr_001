import React from 'react';

export const ExternalResourcePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">자료실</h2>
        <p className="text-slate-400 font-medium mt-2">
          한국프로세스혁신협회의 기술 및 연구 자료실입니다.
        </p>
        <div className="h-2 w-16 bg-kpia-orange mt-4 rounded"></div>
      </div>

      <div className="flex-1 bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden relative min-h-[600px] max-h-[720px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-200 -z-10 bg-slate-50">
          <i className="fas fa-spinner fa-spin text-4xl mb-4 text-kpia-orange"></i>
          <p className="font-bold uppercase tracking-widest text-xs">Loading Resources...</p>
        </div>
        
        <div className="w-full h-full iframe-viewport">
          <iframe 
            src="https://kpii.cafe24.com/board/%EC%9E%90%EB%A3%8C%EC%8B%A4/7/" 
            className="external-board-iframe"
            title="KPII External Resource Board"
            scrolling="yes"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t border-gray-50 z-10 flex items-center justify-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Resource Content View</p>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10"><i className="fas fa-file-archive text-6xl"></i></div>
        <h4 className="text-lg font-black mb-4 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-kpia-orange rounded-full"></span>
           자료실 뷰 안내
        </h4>
        <p className="text-sm text-white/50 font-medium leading-relaxed max-w-2xl">
          협회에서 제공하는 다양한 혁신 사례 및 기술 문서를 확인하실 수 있습니다. 
        </p>
        <div className="flex gap-4 mt-6">
          <a 
            href="https://kpii.cafe24.com/board/%EC%9E%90%EB%A3%8C%EC%8B%A4/7/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-black text-kpia-orange hover:underline flex items-center gap-2"
          >
            <i className="fas fa-external-link-alt"></i> 원본 자료실 새창 열기
          </a>
        </div>
      </div>

      <style>{`
        .iframe-viewport {
          width: 100%;
          height: 650px; 
          overflow: hidden;
          position: relative;
          background: white;
        }

        .external-board-iframe {
          position: absolute;
          top: -510px; 
          left: 0;
          width: 100%;
          height: calc(100% + 1000px); 
          border: none;
        }

        @media (max-width: 768px) {
          .iframe-viewport {
            height: 500px;
          }
          .external-board-iframe {
            top: -420px;
            height: calc(100% + 800px);
          }
        }
      `}</style>
    </div>
  );
};