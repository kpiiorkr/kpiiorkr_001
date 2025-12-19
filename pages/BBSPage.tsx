
import React, { useState } from 'react';
import { useApp } from '../store';
import { MenuType, BBSEntry } from '../types';

interface BBSPageProps {
  category: MenuType;
}

export const BBSPage: React.FC<BBSPageProps> = ({ category }) => {
  const { bbsData, isAdmin, addBBSEntry, updateBBSEntry, deleteBBSEntry } = useApp();
  const [selectedEntry, setSelectedEntry] = useState<BBSEntry | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BBSEntry | null>(null);

  const filteredData = bbsData.filter(item => item.category === category);

  // Management State
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  const openNewModal = () => {
    setEditingEntry(null);
    setFormTitle('');
    setFormContent('');
    setFormImageUrl('');
    setShowAdminModal(true);
  };

  const openEditModal = (entry: BBSEntry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingEntry(entry);
    setFormTitle(entry.title);
    setFormContent(entry.content);
    setFormImageUrl(entry.imageUrl || '');
    setShowAdminModal(true);
  };

  const handleManagementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) return alert('제목과 내용을 입력해주세요.');
    
    const entry: BBSEntry = {
      id: editingEntry?.id || Date.now().toString(),
      category: category,
      title: formTitle,
      content: formContent,
      author: '관리자',
      date: editingEntry?.date || new Date().toISOString().split('T')[0],
      imageUrl: formImageUrl,
    };

    if (editingEntry) {
      updateBBSEntry(entry);
    } else {
      addBBSEntry(entry);
    }
    
    setShowAdminModal(false);
    alert('게시글이 저장되었습니다.');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteBBSEntry(id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setFormImageUrl(reader.result as string);
    }
  };

  // Detail View
  if (selectedEntry) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-slate-900 p-12 text-white relative">
          <button 
            onClick={() => setSelectedEntry(null)}
            className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> 목록으로
          </button>
          <div className="mt-4">
            <span className="bg-kpia-orange text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest mb-4 inline-block">{selectedEntry.category}</span>
            <h2 className="text-4xl font-black tracking-tight leading-tight mb-4">{selectedEntry.title}</h2>
            <div className="flex gap-6 text-sm text-white/60 font-bold">
               <span><i className="fas fa-user mr-2"></i> {selectedEntry.author}</span>
               <span><i className="fas fa-calendar-alt mr-2"></i> {selectedEntry.date}</span>
            </div>
          </div>
        </div>
        
        <div className="p-12">
          {selectedEntry.imageUrl && (
            <div className="bg-slate-50 p-8 rounded-3xl mb-8 flex justify-center border border-slate-100">
               <img src={selectedEntry.imageUrl} className="max-h-48 object-contain" alt="company logo" />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
            {selectedEntry.content}
          </div>
          
          {selectedEntry.fileName && (
            <div className="mt-12 p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-kpia-orange text-xl shadow-sm">
                  <i className="fas fa-file-download"></i>
                </div>
                <div>
                  <p className="font-bold text-slate-800">{selectedEntry.fileName}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Size: {(selectedEntry.fileSize! / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button className="bg-kpia-orange text-white px-6 py-3 rounded-xl font-black hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">Download</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 relative">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">{category}</h2>
          <p className="text-slate-400 font-medium mt-2">
            {category === '회원사소개' 
              ? '한국프로세스혁신협회와 함께하는 우수한 파트너 회원사들을 소개합니다.'
              : `한국프로세스혁신협회의 공식 ${category} 게시판입니다.`}
          </p>
          <div className="h-2 w-16 bg-kpia-orange mt-4 rounded"></div>
        </div>
        {isAdmin && (
          <button 
            onClick={openNewModal}
            className="bg-kpia-orange text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-orange-100 hover:-translate-y-1 transition-all"
          >
            <i className="fas fa-plus"></i> 신규 등록
          </button>
        )}
      </div>

      {category === '회원사소개' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? filteredData.map((company) => (
            <div 
              key={company.id}
              onClick={() => setSelectedEntry(company)}
              className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center text-center"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button onClick={(e) => openEditModal(company, e)} className="w-8 h-8 bg-blue-500 text-white rounded-lg"><i className="fas fa-pen text-xs"></i></button>
                  <button onClick={(e) => handleDelete(company.id, e)} className="w-8 h-8 bg-red-500 text-white rounded-lg"><i className="fas fa-trash text-xs"></i></button>
                </div>
              )}
              <div className="w-full aspect-video bg-slate-50 rounded-3xl mb-6 flex items-center justify-center p-6 border border-slate-50 group-hover:bg-white group-hover:border-orange-100 transition-all overflow-hidden">
                {company.imageUrl ? (
                   <img src={company.imageUrl} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" alt={company.title} />
                ) : (
                   <i className="fas fa-building text-5xl text-slate-200"></i>
                )}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-kpia-orange transition-colors">{company.title}</h3>
              <p className="text-sm text-slate-400 font-medium line-clamp-2 leading-relaxed">{company.content}</p>
              
              <div className="mt-6 pt-6 border-t border-slate-50 w-full flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                 <span>Member Since</span>
                 <span className="text-slate-500">{company.date.split('-')[0]}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 bg-white rounded-[40px] shadow-sm border border-dashed border-gray-200 text-center text-slate-300 font-bold">
               등록된 회원사가 없습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-16 text-center">No.</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Title</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-32 text-center">Author</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-32 text-center">Date</th>
                {isAdmin && <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest w-24 text-center">Manage</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedEntry(item)}
                  className="hover:bg-orange-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-8 py-5 text-sm font-black text-slate-300 text-center">{filteredData.length - idx}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <span className="font-bold text-slate-700 group-hover:text-kpia-orange transition-colors text-lg">{item.title}</span>
                      {item.fileName && <i className="fas fa-paperclip ml-2 text-slate-300 text-sm"></i>}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-400 text-center">{item.author}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-300 text-center">{item.date}</td>
                  {isAdmin && (
                    <td className="px-8 py-5 text-center">
                       <div className="flex gap-2 justify-center">
                         <button onClick={(e) => openEditModal(item, e)} className="text-blue-500 hover:text-blue-700"><i className="fas fa-edit"></i></button>
                         <button onClick={(e) => handleDelete(item.id, e)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash-alt"></i></button>
                       </div>
                    </td>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center text-slate-300 font-bold">게시글이 존재하지 않습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Management Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAdminModal(false)}></div>
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl relative z-10 p-10 animate-in zoom-in-95 duration-300">
             <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
               <i className={`fas ${editingEntry ? 'fa-pen-to-square text-blue-500' : 'fa-plus-circle text-kpia-orange'}`}></i>
               {category} {editingEntry ? '수정' : '신규 등록'}
             </h3>
             <form onSubmit={handleManagementSubmit} className="space-y-6">
               <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Title / Company Name</label>
                 <input 
                   type="text" 
                   value={formTitle}
                   onChange={(e) => setFormTitle(e.target.value)}
                   className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-bold focus:border-kpia-orange outline-none transition-all"
                   placeholder="제목을 입력하세요"
                 />
               </div>
               <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Image / Logo Upload</label>
                 <input 
                   type="file" 
                   accept="image/*"
                   onChange={handleImageUpload}
                   className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-bold focus:border-kpia-orange outline-none transition-all text-sm"
                 />
                 {formImageUrl && <img src={formImageUrl} className="mt-4 h-20 object-contain rounded border bg-slate-50 p-2" />}
               </div>
               <div>
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Content / Description</label>
                 <textarea 
                   rows={6}
                   value={formContent}
                   onChange={(e) => setFormContent(e.target.value)}
                   className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl font-medium focus:border-kpia-orange outline-none transition-all"
                   placeholder="내용을 입력하세요"
                 />
               </div>
               <div className="flex gap-4">
                 <button 
                   type="button" 
                   onClick={() => setShowAdminModal(false)}
                   className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all"
                 >
                   취소
                 </button>
                 <button 
                   type="submit" 
                   className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-slate-200"
                 >
                   {editingEntry ? '수정 완료' : '등록 하기'}
                 </button>
               </div>
             </form>
          </div>
        </div>
      )}

      {/* Pagination Mock */}
      <div className="mt-8 flex justify-center gap-2">
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-kpia-orange hover:text-kpia-orange transition-all"><i className="fas fa-chevron-left text-xs"></i></button>
        <button className="w-10 h-10 bg-kpia-orange text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-orange-100">1</button>
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-kpia-orange hover:text-kpia-orange transition-all"><i className="fas fa-chevron-right text-xs"></i></button>
      </div>
    </div>
  );
};
