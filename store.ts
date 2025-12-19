
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BBSEntry, RollingImage, AppSettings, MenuType, Inquiry } from './types.ts';
import { INITIAL_BBS_DATA, INITIAL_ROLLING_IMAGES } from './constants.tsx';
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from './lib/supabase';

const STORAGE_KEYS = { BBS: 'kpii_bbs_v2', SETTINGS: 'kpii_settings_v2', INQUIRIES: 'kpii_inquiries_v2' };

interface AppContextType {
  bbsData: BBSEntry[];
  inquiries: Inquiry[];
  settings: AppSettings;
  isAdmin: boolean;
  isSyncing: boolean;
  setBbsData: React.Dispatch<React.SetStateAction<BBSEntry[]>>;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  setIsAdmin: (val: boolean) => void;
  addBBSEntry: (entry: BBSEntry) => void;
  updateBBSEntry: (entry: BBSEntry) => void;
  deleteBBSEntry: (id: string) => void;
  addInquiry: (inquiry: Inquiry) => void;
  deleteInquiry: (id: string) => void;
  updateRollingImage: (id: number, url: string, link: string) => void;
  updateProfileImage: (type: 'founder' | 'chairman' | 'logo', url: string) => void;
  updateAdminPassword: (newPass: string) => void;
  toggleSidebar: () => void;
  syncExternalData: (category: '공지사항' | '사회공헌활동' | '자료실') => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [bbsData, setBbsData] = useState<BBSEntry[]>(INITIAL_BBS_DATA);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    showSidebar: true,
    rollingImages: INITIAL_ROLLING_IMAGES,
    founderImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    chairmanImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    logoImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/logo.png',
    adminPassword: 'password'
  });
  const [isAdmin, setIsAdminState] = useState(false);
  const [settingsRowId, setSettingsRowId] = useState<string | null>(null);

  // Load from localStorage on mount + Supabase settings 덮어쓰기
useEffect(() => {
  const loadFromStorageAndSupabase = async () => {
    try {
      // 1) 기존: localStorage에서 복원
      const savedBbs = localStorage.getItem(STORAGE_KEYS.BBS);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      const savedAdmin = localStorage.getItem('kpii_is_admin');
      
      if (savedBbs) setBbsData(JSON.parse(savedBbs));
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      }
      if (savedAdmin) setIsAdminState(savedAdmin === 'true');

      // 2) 추가: Supabase settings 테이블에서 1건 읽어와서 덮어쓰기
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (!error && data) {
        setSettings(prev => ({
          ...prev,
          logoImageUrl: data.logo_image_url ?? prev.logoImageUrl,
          founderImageUrl: data.founder_image_url ?? prev.founderImageUrl,
          chairmanImageUrl: data.chairman_image_url ?? prev.chairmanImageUrl,
        }));
        setSettingsRowId(data.id); // 위에서 만든 state
      }
    } catch (e) {
      console.error("Data recovery failed", e);
    } finally {
      // Set a small timeout to ensure initial state is stable
      setTimeout(() => setIsInitialized(true), 50);
    }
  };

  loadFromStorageAndSupabase();
}, []);


  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEYS.BBS, JSON.stringify(bbsData));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn("Storage quota exceeded. Base64 images may be too large.", e);
    }
  }, [bbsData, settings, inquiries, isInitialized]);

  const setIsAdmin = useCallback((val: boolean) => {
    setIsAdminState(val);
    localStorage.setItem('kpii_is_admin', String(val));
  }, []);

  const addInquiry = useCallback((inquiry: Inquiry) => setInquiries(prev => [inquiry, ...prev]), []);
  const deleteInquiry = useCallback((id: string) => setInquiries(prev => prev.filter(i => i.id !== id)), []);

  const syncExternalData = async (category: '공지사항' | '사회공헌활동' | '자료실') => {
    let apiKey = '';
    try { apiKey = (process.env as any).API_KEY; } catch (e) {}
    if (!apiKey) return alert("API_KEY가 설정되지 않았습니다.");
    
    const urlMap = {
      '공지사항': 'https://kpii.cafe24.com/board/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD/1/',
      '사회공헌활동': 'https://kpii.cafe24.com/board/%EC%82%AC%ED%9A%8C%EA%B3%B5%ED%97%8C%ED%99%9C%EB%8F%99/4/',
      '자료실': 'https://kpii.cafe24.com/board/%EC%9E%90%EB%A3%8C%EC%8B%A4/7/'
    };

    setIsSyncing(true);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlMap[category])}`;
      const fetchRes = await fetch(proxyUrl);
      const jsonRes = await fetchRes.json();
      const htmlContent = jsonRes.contents;

      const ai = new GoogleGenAI({ apiKey: apiKey });
      const prompt = `HTML 소스에서 최신 게시물 5개의 제목과 작성 날짜를 JSON 배열로 추출하세요. 카테고리는 ${category}입니다. 마크다운 없이 순수 JSON만 반환하세요.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt + "\n\n" + htmlContent.substring(0, 10000) }] }],
        config: { responseMimeType: "application/json" }
      });

      const text = response.text;
      if (!text) throw new Error("AI 응답이 비어있습니다.");
      
      const parsedData = JSON.parse(text.replace(/```json|```/g, "").trim());
      const newEntries = parsedData.map((item: any, idx: number) => ({
        id: `ext-${category}-${idx}-${Date.now()}`,
        category: category,
        title: item.title,
        content: item.content || item.title,
        author: '관리자',
        date: item.date || new Date().toISOString().split('T')[0]
      }));

      setBbsData(prev => {
        const others = prev.filter(item => item.category !== category);
        return [...newEntries, ...others];
      });
      alert(`${category} 데이터가 성공적으로 동기화되었습니다.`);
    } catch (err) {
      console.error(err);
      alert("동기화 중 오류가 발생했습니다.");
    } finally {
      setIsSyncing(false);
    }
  };

  const addBBSEntry = useCallback((entry: BBSEntry) => setBbsData(prev => [entry, ...prev]), []);
  const updateBBSEntry = useCallback((updated: BBSEntry) => setBbsData(prev => prev.map(e => e.id === updated.id ? updated : e)), []);
  const deleteBBSEntry = useCallback((id: string) => setBbsData(prev => prev.filter(e => e.id !== id)), []);
  
  const updateRollingImage = useCallback((id: number, url: string, link: string) => {
    setSettings(prev => ({
      ...prev,
      rollingImages: (prev.rollingImages || []).map(img => img.id === id ? { ...img, url, link } : img)
    }));
  }, []);

const updateProfileImage = useCallback(
  async (type: 'founder' | 'chairman' | 'logo', url: string) => {
    // 1) 먼저 로컬 상태 업데이트 (UI 즉시 반영)
    setSettings(prev => ({ ...prev, [`${type}ImageUrl`]: url }));

    // 2) Supabase에도 저장
    try {
      if (!settingsRowId) return; // 아직 Supabase에서 id를 못 읽었으면 그냥 로컬만 반영

      const payload: any = {};
      if (type === 'logo') payload.logo_image_url = url;
      if (type === 'founder') payload.founder_image_url = url;
      if (type === 'chairman') payload.chairman_image_url = url;

      const { error } = await supabase
        .from('settings')
        .update(payload)
        .eq('id', settingsRowId);

      if (error) {
        console.error('Supabase update error:', error);
        alert('이미지 설정을 저장하는 중 오류가 발생했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('이미지 설정을 저장하는 중 예기치 않은 오류가 발생했습니다.');
    }
  },
  [settingsRowId]
);


  const updateAdminPassword = useCallback((newPass: string) => setSettings(prev => ({ ...prev, adminPassword: newPass })), []);
  const toggleSidebar = useCallback(() => setSettings(prev => ({ ...prev, showSidebar: !prev.showSidebar })), []);

  return React.createElement(AppContext.Provider, {
    value: { 
      bbsData, inquiries, settings, isAdmin, isSyncing,
      setBbsData, setSettings, setIsAdmin, 
      addBBSEntry, updateBBSEntry, deleteBBSEntry, 
      addInquiry, deleteInquiry,
      updateRollingImage, updateProfileImage, updateAdminPassword, toggleSidebar,
      syncExternalData
    }
  }, children);
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
