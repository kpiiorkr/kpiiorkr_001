import React from 'react';
import { useApp } from '../store.ts';

export const Chairman: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-20">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">회장사 소개</h2>
        <p className="text-slate-400 font-medium mt-2">한국프로세스혁신협회를 이끄는 회장사 STA테스팅컨설팅의 비전과 활동을 소개합니다.</p>
        <div className="h-2 w-16 bg-kpia-orange mt-4 rounded"></div>
      </div>

      {/* Section 1: CEO Greeting & Profile */}
      <section className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/3 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0">
             <img src={settings.chairmanImageUrl} className="w-full h-full object-cover aspect-[3/4]" alt="권원일 회장" />
          </div>
          <div className="flex-1">
             <div className="mb-4">
                <span className="text-kpia-orange font-black text-xs uppercase tracking-widest border-b-2 border-kpia-orange pb-1">Chairman & CEO</span>
             </div>
             <h3 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">권 원 일 (Won-il Kwon)</h3>
             <p className="text-kpia-orange font-bold text-lg mb-8">STA테스팅컨설팅 대표이사 / 협회장</p>
             
             {/* 기조연설문으로 텍스트 교체 및 폰트 사이즈 조정 */}
             <div className="space-y-4 text-[13px] text-slate-500 font-medium leading-relaxed text-justify">
               <p className="font-black text-slate-800 text-sm mb-4">"업무 프로세스 자동화 중심의 디지털 혁신은 더 이상 선택이 아닙니다. (협회 컨퍼런스 기조연설문)"</p>
               
               <p>상용 솔루션에 편향된 내용이 아닌, "실무자 또는 전문가의 실제 적용 사례와 경험"이 여러분의 난해한 디지털 혁신을 가시화해 줄 것입니다.</p>
               
               <p>협회 설립자인 강승원님이 디지털 혁신 실무 사례와 경험을 가진 연사를 섭외했습니다. 데브멘토 이병희 대표님 등 행사 전문가의 자문을 받아가며 최적의 발표진을 구성했습니다. 수고 많으셨고 감사합니다. 발표진, 행사 운영 관계자, 후원사 관계자 여러분께도 감사 말씀 전합니다.</p>
               
               <p>덕분에 새로운 디지털 혁신 및 업무자동화 실무 사례를 보고 들으며, 올해, 그리고 앞으로 어떻게 디지털 혁신을 이뤄갈지, 다양한 시각에서 깊이있게 생각해 볼 기회를 갖게 됐습니다.</p>
               
               <p>디지털 시대에 급변하는 업무 환경의 변화는 물론, 생성AI 등 생산적이면서도 파괴적인 새로운 기술이 우리에게 파도처럼 몰려오고 있습니다. 이전 보다 훨씬 큰 파도입니다. 우리의 선택은 이 파도에 부딪혀 내팽켜질지, 이 파도를 타고 즐길지... 그 중에 한가지 입니다.</p>
               
               <p>서핑하는 분들은 잘 아시겠지만, 큰 파도일수록 훨씬 재밌고 만족도와 성과도 큽니다. 오늘 참석한 분들은 디지털 서퍼로서 기다려 왔던 큰 파도를 타고 즐기시게 될겁니다. 저희 한국 프로세스 혁신협회는 본 세미나를 통해 큰 파도를 잘 타는 방법과 팁을 제시해 드리고자 합니다. 이 컨퍼런스에 오신 여러분들은, 올해 하시는 업무마다 값진 결과로 보상 받으시게 될겁니다.^^</p>
               
               <p>청룡의 기운이 넘치는 갑진년 새해, 복 많이 받으시기 바랍니다. 이것으로 인사말을 마치고. "RPA기반 업무 자동화 및 디지털 혁신사례 컨퍼런스" 개최를 선포합니다. 감사합니다.</p>
               
               <div className="pt-4 text-right border-t border-slate-50">
                  <p className="font-black text-slate-800">한국프로세스혁신협회</p>
                  <p className="text-kpia-orange font-black text-base">회장 권원일 DREAM</p>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-kpia-orange shadow-sm font-black italic">1st</div>
                   <p className="text-slate-700 font-bold text-sm">국내 최초 테스팅 전문 기업</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-kpia-orange shadow-sm"><i className="fas fa-certificate"></i></div>
                   <p className="text-slate-700 font-bold text-sm">ISTQB/KSTQB 공식 교육기관</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section 2: Career History */}
      <section className="bg-slate-50 rounded-[40px] p-10 md:p-14 border border-slate-100">
        <h4 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3">
           <i className="fas fa-history text-kpia-orange"></i>
           주요 약력 및 활동
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-[14px] font-bold text-slate-600">
           {[
             '현) STA테스팅컨설팅 대표이사',
             '현) 한국프로세스혁신협회(KPII) 협회장',
             '현) KSTQB(한국소프트웨어테스팅자격위원회) 부회장',
             '현) ISTQB(국제소프트웨어테스팅자격위원회) 정회원 / 한국대표',
             '현) ISO/IEC/IEEE 29119(소프트웨어 테스팅 국제표준) 한국대표 위원',
             '전) 삼성전자 소프트웨어 테스팅 자문교수',
             '전) LG전자 품질 고도화 컨설턴트',
             '전) 국방/공공부문 SW 품질 내실화 심의 위원',
             '소프트웨어 공학 박사 및 테스팅 자동화 전문가',
             '저서: "소프트웨어 테스팅 실무", "모바일 앱 테스팅" 등 다수',
             '다수의 대규모 차세대 시스템 품질 컨설팅 PM 수행',
             '글로벌 SW 품질 컨퍼런스 기조 강연 및 주제 발표 다수'
           ].map((item, i) => (
             <div key={i} className="flex gap-4 items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
               <span className="w-2 h-2 rounded-full bg-kpia-orange flex-shrink-0"></span>
               {item}
             </div>
           ))}
        </div>
      </section>

      {/* Footer Link */}
      <div className="text-center pt-8">
         <a 
           href="https://sta.co.kr" 
           target="_blank" 
           rel="noopener noreferrer"
           className="inline-block bg-slate-900 text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1"
         >
            STA테스팅컨설팅 공식 홈페이지 방문하기 <i className="fas fa-external-link-alt ml-3"></i>
         </a>
      </div>

      {/* Section 3: Chairman Company Vision & Values (Added based on sta.co.kr/sub/company/Vision.php) */}
      <section className="mt-16 bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center">
            <h3 className="text-kpia-orange font-black text-xs uppercase tracking-[0.4em] mb-4">Chairman's Company Vision</h3>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">World Best SW Quality Leader</h4>
            <p className="text-slate-400 font-medium mt-4">STA테스팅컨설팅은 소프트웨어 테스팅 및 품질 관리 분야의 글로벌 리더를 지향합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-10 rounded-[32px] border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h5 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <i className="fas fa-eye text-kpia-orange"></i> 비전 (Vision)
              </h5>
              <p className="text-sm text-slate-600 font-bold leading-loose">
                "세계 최고의 소프트웨어 테스팅 전문 기업"<br/>
                국제 표준 기반의 전문 지식과 혁신적인 자동화 기술을 통해 전 세계 소프트웨어 품질의 기준을 세웁니다.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[32px] border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h5 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <i className="fas fa-bullseye text-blue-500"></i> 미션 (Mission)
              </h5>
              <p className="text-sm text-slate-600 font-bold leading-loose">
                "소프트웨어 테스팅의 대중화와 전문화 선도"<br/>
                누구나 신뢰할 수 있는 소프트웨어를 만들 수 있도록 최상의 교육과 컨설팅, 솔루션을 제공하여 사회적 가치를 창출합니다.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="text-lg font-black text-slate-800 text-center mb-10 uppercase tracking-widest">Core Values</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Expertise', sub: '전문성', icon: 'fa-award', desc: '끊임없는 연구와 학습으로 해당 분야 최고의 실력을 지향합니다.' },
                { title: 'Innovation', sub: '혁신', icon: 'fa-rocket', desc: '현실에 안주하지 않고 새로운 기술과 방법론을 끊임없이 도입합니다.' },
                { title: 'Trust', sub: '신뢰', icon: 'fa-shield-halved', desc: '정직과 원칙을 준수하며 고객과의 약속을 최우선으로 여깁니다.' }
              ].map((val, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-kpia-orange transition-colors">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-kpia-orange rounded-2xl flex items-center justify-center text-xl mx-auto mb-6 transition-colors">
                    <i className={`fas ${val.icon}`}></i>
                  </div>
                  <h6 className="text-sm font-black text-slate-800">{val.title}</h6>
                  <p className="text-[10px] font-black text-kpia-orange mb-3">{val.sub}</p>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-slate-50">
             <div className="bg-slate-900 p-8 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5"><i className="fas fa-quote-right text-6xl"></i></div>
                <div>
                   <p className="text-xs font-black text-kpia-orange uppercase tracking-widest mb-2">Slogan</p>
                   <p className="text-xl font-black italic">"Better Software, Better World"</p>
                </div>
                <div className="text-[11px] text-white/50 font-bold max-w-sm text-right">
                   STA테스팅컨설팅은 소프트웨어가 우리 삶의 질을 높이는 세상을 꿈꾸며,<br/>
                   그 중심에서 품질이라는 가장 견고한 초석을 다지고 있습니다.
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
