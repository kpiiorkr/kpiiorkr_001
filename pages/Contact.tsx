import React, { useState } from 'react';
import { useApp } from '../store.ts';

export const Contact: React.FC = () => {
  const { addInquiry } = useApp();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert('제목과 내용을 입력해주세요.');
    
    setIsSubmitting(true);
    
    try {
      // 전송 애니메이션 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 문의 내용 내부 저장소에 저장
      addInquiry({
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        date: new Date().toLocaleString(),
        status: 'new'
      });

      setShowPopup(true);
      setFormData({ title: '', content: '' });
      setFile(null);
    } catch (err) {
      alert('발송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 mb-20 animate-in fade-in duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Contact Us</h2>
        <p className="text-slate-400 font-medium mt-2">협회 운영 및 제휴에 관한 문의사항을 남겨주시면 담당자가 확인 후 답변드립니다.</p>
        <div className="h-2 w-16 bg-kpia-orange mt-4 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-800 mb-8 relative z-10">오시는 길 및 안내</h3>
              <div className="space-y-8 relative z-10 mb-10">
                 <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-kpia-orange text-xl flex-shrink-0">
                       <i className="fas fa-location-dot"></i>
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Office Address</p>
                       <p className="font-black text-slate-700 text-lg">서울특별시 광진구 자양강변길 115, STA타워</p>
                    </div>
                 </div>
                 <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl flex-shrink-0">
                       <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Email Inquiry</p>
                       <p className="font-black text-slate-700 text-lg">ai@aag.co.kr</p>
                    </div>
                 </div>
              </div>
              
              <div className="w-full h-[450px] bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.963749439355!2d127.06518939999998!3d37.53235180000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e240b66c6f5%3A0xf796187ea70a9ef3!2zU1RB7YWM7Iqk7YyF7Luo7ISk7YyF!5e0!3m2!1sko!2skr!4v1753061094998!5m2!1sko!2skr" 
                  width="100%" height="100%" style={{border: 0}} allowFullScreen={true} loading="lazy" 
                ></iframe>
              </div>
           </div>
        </div>

        <div className="bg-white p-10 lg:p-14 rounded-[40px] shadow-2xl border border-gray-100">
           <div className="flex items-center mb-10">
              <div className="w-14 h-14 bg-kpia-orange text-white rounded-2xl flex items-center justify-center text-2xl mr-5 shadow-xl shadow-orange-100">
                <i className="fas fa-paper-plane"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">온라인 문의</h3>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Send us a message</p>
              </div>
           </div>

           <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                 <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em] ml-1">Title</label>
                 <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="문의 제목을 입력해 주세요"
                    className="w-full p-5 bg-slate-50 border border-gray-100 rounded-[20px] focus:bg-white focus:border-kpia-orange focus:ring-4 focus:ring-orange-50 transition-all outline-none font-bold text-slate-700"
                 />
              </div>
              <div>
                 <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em] ml-1">Message</label>
                 <textarea 
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="내용을 작성해 주시면 담당자가 관리자 센터에서 확인 후 연락드립니다."
                    className="w-full p-5 bg-slate-50 border border-gray-100 rounded-[20px] focus:bg-white focus:border-kpia-orange focus:ring-4 focus:ring-orange-50 transition-all outline-none font-medium text-slate-700 leading-relaxed"
                 />
              </div>
              <button 
                 type="submit" disabled={isSubmitting}
                 className={`w-full py-6 rounded-[24px] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-4 ${
                   isSubmitting ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-kpia-orange text-white hover:bg-[#e66c1b] shadow-orange-100 transform hover:-translate-y-1'
                 }`}
              >
                 {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> 전송 중...</> : <><i className="fas fa-paper-plane"></i> 문의하기</>}
              </button>
           </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm relative z-10 overflow-hidden transform animate-in zoom-in duration-300">
             <div className="bg-kpia-orange h-32 flex items-center justify-center relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-kpia-orange text-4xl shadow-2xl border-4 border-orange-50 relative z-10">
                   <i className="fas fa-check"></i>
                </div>
             </div>
             <div className="p-10 text-center">
                <h4 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter">문의가 전송되었습니다!</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm">
                   성공적으로 문의 내용이 저장되었습니다.<br/>관리자 센터에서 확인 후 신속하게 연락드리겠습니다.
                </p>
                <button onClick={() => setShowPopup(false)} className="w-full bg-slate-900 hover:bg-black py-4 rounded-2xl text-white font-black transition-all shadow-xl shadow-slate-200">확인</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};