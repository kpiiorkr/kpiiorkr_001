
import React from 'react';
import { useApp } from '../store';

export const Founder: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-6xl mx-auto mb-20 animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">설립자 소개</h2>
        <p className="text-slate-400 font-medium mt-2">한국프로세스혁신협회를 설립한 강승원 이사의 약력 및 활동 실적입니다.</p>
        <div className="h-2 w-16 bg-kpia-orange mt-4 rounded"></div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
        {/* Left Side: Professional Portrait */}
        <div className="lg:w-[320px] bg-slate-50 p-10 flex flex-col items-center border-r border-gray-100">
           <div className="w-56 h-72 rounded-[32px] overflow-hidden shadow-2xl mb-8 border-4 border-white relative">
              <img 
                src={settings.founderImageUrl} 
                className="w-full h-full object-cover" 
                alt="강승원" 
              />
           </div>
           <div className="text-center mb-10">
             <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2">강 승 원</h3>
             <p className="text-kpia-orange font-black text-[10px] uppercase tracking-[0.3em] bg-orange-50 px-4 py-1.5 rounded-full inline-block">Founder & Director (AAG)</p>
           </div>
           
           <div className="w-full space-y-4 px-2">
              <div className="flex flex-col text-xs py-3 border-b border-gray-100">
                <span className="text-slate-300 font-black uppercase mb-1">Email</span>
                <span className="text-slate-700 font-bold">ai@aag.co.kr</span>
              </div>
              <div className="flex flex-col text-xs py-3">
                <span className="text-slate-300 font-black uppercase mb-1">Community</span>
                <a href="http://www.rpamaster.co.kr" target="_blank" className="text-kpia-orange font-bold hover:underline">rpamaster.co.kr</a>
              </div>
           </div>
        </div>

        {/* Right Side: Detailed Career & Achievements */}
        <div className="flex-1 p-10 lg:p-16 space-y-16 bg-white overflow-y-auto max-h-[1000px] no-scrollbar">
           
           <section>
              <h4 className="text-2xl font-black text-slate-800 mb-10 flex items-center">
                <span className="w-10 h-10 bg-kpia-orange text-white rounded-xl flex items-center justify-center mr-4 shadow-xl shadow-orange-100">
                  <i className="fas fa-briefcase text-sm"></i>
                </span>
                주요경력
              </h4>
              <ul className="space-y-4 text-[15px] font-bold text-slate-600 leading-relaxed">
                <li className="flex gap-4"><span>•</span> MS 파워 오토메이트 클라우드 저자</li>
                <li className="flex gap-4"><span>•</span> KSTQB(한국소프트웨어테스팅자격위원회) 자문위원</li>
                <li className="flex gap-4"><span>•</span> 한국프로세스혁신협회 디지털 프로세스 혁신 전문단</li>
                <li className="flex gap-4"><span>•</span> 가천대학교 스마트시티융합과 박사과정(비즈니스 최적화 알고리즘)</li>
                <li className="flex gap-4"><span>•</span> 서울 중앙대학교 공학사 및 일반대학원 공학석사(수자원공학)</li>
                <li className="flex gap-4"><span>•</span> 카이스트 디지털금융 디지털전문가(인공지능과 기계학습 트랙)</li>
                <li className="flex gap-4"><span>•</span> 카이스트 디지털금융 디지털전문가(핀테크와 비즈니스애널리틱스 트랙)</li>
                <li className="flex gap-4"><span>•</span> AI/DT 주제 RPA마스터 커뮤니티 운영 (http://www.rpamaster.co.kr)</li>
                <li className="flex gap-4"><span>•</span> 한국프로세스혁신협회 설립 및 운영(http://www.kpii.or.kr)</li>
                <li className="flex gap-4"><span>•</span> 도서 집필활동(실습으로 배우는 데이터 분석, RPA가이드 등)</li>
                <li className="flex gap-4"><span>•</span> 중앙정보기술인재개발원, 인공지능, 정보기술(전략, 계획)부문 전문위원</li>
                <li className="flex gap-4"><span>•</span> 서울 및 대전 디지털배움터, 디지털 역량강화 교육 강사</li>
                <li className="flex gap-4"><span>•</span> 프로세스 혁신 관련 PM/컨설팅/분석설계/개발 다수 참여</li>
              </ul>
           </section>

           <section className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
              <h4 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                 <i className="fas fa-project-diagram text-kpia-orange"></i>
                 실무 프로젝트 참여 내역
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> 글로벌 및 국내 은행 시스템 개발</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> 선도 통신 및 금융사 빅데이터 분석</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> LG전자 NERP PI 프로세스 혁신 사업 참여(프로세스 마이닝)</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> LG CNS 모바일 자동화 개발</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> LG CNS RPA Open시장 컨설팅 및 사내 사업지원</li>
                 <li className="fas fa-caret-right text-kpia-orange mt-1"></li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> 건강보험 심사평가원 대내외 서비스 개선사업 RPA부문 PM</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> 현대백화점그룹, 동양생명, 광동제약, 티머니 참여</li>
                 <li className="flex gap-3"><i className="fas fa-caret-right text-kpia-orange mt-1"></i> 롯데백화점 PM 및 롯데멤버스, 에쓰오일, 삼성전자 프로세스 사업 개발참여</li>
              </ul>
           </section>

           <section>
              <h4 className="text-2xl font-black text-slate-800 mb-6 flex items-center">
                <span className="w-10 h-10 bg-kpia-gray text-white rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <i className="fas fa-award text-sm"></i>
                </span>
                주요 AI 등 디지털 부문 교육/강연/발표/심사평가 실적
              </h4>
              <div className="space-y-0.5">
                {[
                  { title: '2025 한국지능시스템학회 논문 2편 투고 “금융 서비스 최적화 … 알고리즘과 대형언어모델의 결합” 등' },
                  { title: '2025 KIER 한국에너지기술연구원, “AI 업무 처리 자동화를 통한 프로세스 혁신 및 연구사례”' },
                  { title: '2025 한국프로세스혁신협회, “Insight세미나, AI 자동화 중심의 업무 혁신 사례”' },
                  { title: '2025 KT AX Degree, KT 전사 직원을 위한 AX주제 VOD 강의 납품' },
                  { title: '2024 NST 국가과학기술연구회, 소통 한마당 - 출연연 연구행정혁신 공모 심사위원' },
                  { title: '2024 KIER 한국에너지기술연구원, "프로세스 혁신을 위한 프로세스 마이닝과 RPA의 연구사례“' },
                  { title: '2024 대림대학교 직원경쟁력 강화, 대학행정 혁신을 위한 RPA의 적용 사례 연구' },
                  { title: '2024 한국프로세스혁신협회 “Insight”세미나, “글로벌 디지털 산업전망”' },
                  { title: '2024 KIER 한국에너지기술연구원, 업무혁신 해커톤 심사위원' },
                  { title: '2024 한국지능시스템학회 논문 4편 투고' },
                  { title: '2024 건강보험심사평가원, 업무 처리 자동화(RPA) 전문가 특강강사' },
                  { title: '2024 한국프로세스혁신협회 컨퍼런스, “RPA기반 업무 자동화 및 디지털 혁신사례” 기획운영' },
                  { title: '2023 출연(연) 연구행정 디지털전환, 전문가 평가자' },
                  { title: '2023 국가과학기술연구회, 연구행정혁신 대제전 심사위원' },
                  { title: '2023 삼성 SDC23 커뮤니티 “금융권 업무처리 자동화 시스템 아키텍처와 디지털 혁신” 발표' },
                  { title: '2023 한국프로세스혁신협회 “Insight”세미나, 글로벌 디지털 산업 전망(삼성전자 R&D캠퍼스)' },
                  { title: '2023 Microsoft Power Platform MVP Book Seminar 자동화 주제 발표' },
                  { title: '2023 건강보험심사평가원, 디지털전환과 프로세스 혁신 강의' },
                  { title: '2023 데브멘토, 기업의 RPA+챗GPT 적용사례 및 전망 세미나' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-1.5 hover:bg-slate-50 rounded-2xl transition-all border-b border-slate-50 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-kpia-orange mt-2 flex-shrink-0"></span>
                    <p className="text-slate-700 font-bold leading-relaxed text-[13px]">{item.title}</p>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
