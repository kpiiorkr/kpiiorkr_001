
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="relative h-80 rounded-[40px] overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="about header" />
        <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white text-center p-8">
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">Innovation for Future</h2>
           <p className="text-xl font-bold text-white/80 max-w-2xl leading-relaxed">한국프로세스혁신협회는 기업의 프로세스 혁신을 선도하고 대한민국의 디지털 경쟁력을 강화합니다.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          <div className="flex items-center mb-8">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight mr-4">협회 개요</h3>
            <div className="h-1 flex-1 bg-gray-100 rounded"></div>
          </div>
          <div className="bg-white p-10 rounded-[32px] shadow-xl border border-gray-100">
             <p className="text-lg text-slate-600 font-medium leading-loose mb-8">
               대한민국은 글로벌 디지털 대전환 시대를 맞이하여 전례 없는 변화의 물결 속에 있습니다. 한국프로세스혁신협회는 기업과 사회가 프로세스 혁신을 통해 새로운 가치를 창출하고, 효율성을 극대화할 수 있도록 지원하기 위해 설립되었습니다.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
               <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100">
                  <i className="fas fa-bullseye text-4xl text-kpia-orange mb-4"></i>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">미션</h4>
                  <p className="text-slate-500 font-medium">프로세스 혁신 지식 공유와 실무 중심 교육을 통해 인재를 양성하고 산업 발전에 기여합니다.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  <i className="fas fa-eye text-4xl text-slate-600 mb-4"></i>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">비전</h4>
                  <p className="text-slate-500 font-medium">대한민국 최고의 프로세스 혁신 네트워크이자 디지털 전환의 허브가 되겠습니다.</p>
               </div>
             </div>
          </div>
        </section>

        <section>
          <div className="flex items-center mb-8">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight mr-4">주요 사업분야</h3>
            <div className="h-1 flex-1 bg-gray-100 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'fa-graduation-cap', title: '전문 교육 사업', desc: 'RPA, 프로세스 마이닝 등 디지털 기술 기반 교육 과정 운영' },
              { icon: 'fa-handshake', title: '네트워크 강화', desc: '회원사 간 교류 및 산업계 협력 네트워크 구축' },
              { icon: 'fa-chart-line', title: '연구 및 발간', desc: '최신 기술 트렌드 연구 보고서 및 실무 매뉴얼 발간' }
            ].map((biz, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 bg-slate-50 text-kpia-orange rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm"><i className={`fas ${biz.icon}`}></i></div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{biz.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{biz.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
