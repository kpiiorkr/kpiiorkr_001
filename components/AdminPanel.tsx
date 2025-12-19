import React, { useState } from 'react';
import { useApp } from '../store.ts';
import { MenuType, BBSEntry, Inquiry } from '../types.ts';

export const AdminPanel: React.FC = () => {
  const { 
    isAdmin, setIsAdmin, addBBSEntry, updateBBSEntry, deleteBBSEntry, 
    updateRollingImage, updateProfileImage, settings, updateAdminPassword, 
    bbsData, inquiries, deleteInquiry 
  } = useApp();
  
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // BBS states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MenuType>('공지사항');
  const [newContent, setNewContent] = useState('');
  const [newBbsImageUrl, setNewBbsImageUrl] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === (settings.adminPassword || 'password')) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) return alert('비밀번호는 4자리 이상이어야 합니다.');
    updateAdminPassword(newPassword);
    setNewPassword('');
    alert('비밀번호가 성공적으로 변경되었습니다.');
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleRollingImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      updateRollingImage(id, base64, settings.rollingImages.find(img => img.id === id)?.link || '#');
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      updateProfileImage('logo', base64);
      alert('로고가 성공적으로 업데이트되었습니다.');
    }
  };

  const handleProfileImageUpload = async (type: 'founder' | 'chairman', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      updateProfileImage(type, base64);
      alert(`${type === 'founder' ? '설립자' : '회장'} 이미지가 성공적으로 업데이트되었습니다.`);
    }
  };

  const handlePostBBS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return alert('제목과 내용을 입력해주세요.');
    
    const entry: BBSEntry = {
      id: editingId || Date.now().toString(),
      category: newCategory,
      title: newTitle,
      content: newContent,
      author: '관리자',
      date: editingId ? (bbsData.find(b => b.id === editingId)?.date || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      imageUrl: newBbsImageUrl,
    };
    
    if (editingId) {
      updateBBSEntry(entry);
      setEditingId(null);
    } else {
      addBBSEntry(entry);
    }
    setNewTitle(''); setNewContent(''); setNewBbsImageUrl('');
    alert('게시글이 성공적으로 저장되었습니다.');
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[40px] shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-kpia-orange text-white rounded-[24px] flex items-center justify-center text-3xl mb-6 shadow-2xl shadow-orange-100">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Admin Login</h2>
          <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-50 transition-all outline-none font-bold" 
            placeholder="관리자 비밀번호" 
          />
          {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[20px] font-black text-lg shadow-2xl hover:bg-black transition-all">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b-2 border-kpia-orange pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">관리자 센터</h2>
          <p className="text-slate-400 font-medium mt-1">사이트 설정 및 문의 관리</p>
        </div>
        <button onClick={() => setIsAdmin(false)} className="bg-slate-100 hover:bg-slate-200 px-8 py-3 rounded-xl text-sm font-black text-slate-600 transition-colors">Logout</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Inbox Section */}
        <section className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
           <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg"><i className="fas fa-inbox"></i></div>
              <h3 className="text-xl font-black">고객 문의함 (Inbox)</h3>
           </div>
           
           <div className="space-y-4">
              {inquiries.length > 0 ? inquiries.map((iq) => (
                <div key={iq.id} className="group p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-200 rounded-3xl transition-all cursor-pointer" onClick={() => setSelectedInquiry(iq)}>
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{iq.title}</h4>
                      <span className="text-[10px] font-black text-slate-300 uppercase">{iq.date}</span>
                   </div>
                   <p className="text-xs text-slate-400 line-clamp-1">{iq.content}</p>
                </div>
              )) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px] text-slate-300 font-bold italic">
                   접수된 문의 내역이 없습니다.
                </div>
              )}
           </div>
        </section>

        {/* Global Settings */}
        <section className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 space-y-8">
          <div className="flex items-center">
             <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg"><i className="fas fa-cog"></i></div>
             <h3 className="text-xl font-black">시스템 설정</h3>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Logo Image</label>
               <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-xs w-full" />
               <div className="mt-3 h-10 flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <img src={settings.logoImageUrl} className="h-full object-contain mx-auto" alt="Logo" />
               </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Founder Profile Image</label>
               <input type="file" accept="image/*" onChange={(e) => handleProfileImageUpload('founder', e)} className="text-xs w-full" />
               <div className="mt-3 h-10 flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <img src={settings.founderImageUrl} className="h-full object-contain mx-auto" alt="Founder" />
               </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Chairman Profile Image</label>
               <input type="file" accept="image/*" onChange={(e) => handleProfileImageUpload('chairman', e)} className="text-xs w-full" />
               <div className="mt-3 h-10 flex items-center bg-white p-2 rounded-lg border border-gray-100">
                  <img src={settings.chairmanImageUrl} className="h-full object-contain mx-auto" alt="Chairman" />
               </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Admin Password</label>
               <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl mb-3 text-sm" placeholder="새 비밀번호" />
               <button onClick={handlePasswordChange} className="w-full bg-red-500 text-white py-2.5 rounded-xl text-xs font-black">Change Password</button>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)}></div>
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl relative z-10 p-10 animate-in zoom-in-95 duration-300">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Customer Inquiry</p>
                   <h3 className="text-2xl font-black text-slate-800">{selectedInquiry.title}</h3>
                   <p className="text-xs text-slate-400 mt-1">{selectedInquiry.date}</p>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="text-slate-300 hover:text-slate-600 transition-colors"><i className="fas fa-times text-xl"></i></button>
             </div>
             
             <div className="bg-slate-50 p-8 rounded-3xl text-slate-600 font-medium leading-loose whitespace-pre-wrap mb-8 max-h-80 overflow-y-auto">
                {selectedInquiry.content}
             </div>

             <div className="flex gap-4">
                <button onClick={() => { deleteInquiry(selectedInquiry.id); setSelectedInquiry(null); }} className="flex-1 py-4 bg-red-50 text-red-500 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all">삭제하기</button>
                <button onClick={() => setSelectedInquiry(null)} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black">확인 완료</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
