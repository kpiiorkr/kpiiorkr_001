import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { BBSEntry, RollingImage, AppSettings, MenuType, Inquiry, MemberCompany } from './types.ts';
import { INITIAL_BBS_DATA, INITIAL_ROLLING_IMAGES } from './constants.tsx';
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from './lib/supabase';

const STORAGE_KEYS = {
  BBS: 'kpii_bbs_data',
  SETTINGS: 'kpii_settings',
  INQUIRIES: 'kpii_inquiries'
} as const;

interface AppContextType {
  currentMenu: MenuType;
  setCurrentMenu: (menu: MenuType) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isSyncing: boolean;
  bbsData: BBSEntry[];
  addBbsEntry: (entry: Omit<BBSEntry, 'id' | 'date'>) => void;
  updateBbsEntry: (id: number, entry: Partial<BBSEntry>) => void;
  deleteBbsEntry: (id: number) => void;
  settings: AppSettings;
  updateRollingImage: (id: number, url: string, link?: string) => void;
  updateProfileImage: (type: 'founder' | 'chairman' | 'logo', url: string) => Promise<void>;
  updateAdminPassword: (password: string) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  deleteInquiry: (id: number) => void;
  answerInquiry: (id: number, answer: string) => void;
  askAI: (question: string) => Promise<string>;
  memberCompanies: MemberCompany[];
  addMemberCompany: (company: Omit<MemberCompany, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateMemberCompany: (id: string, updates: Partial<MemberCompany>) => Promise<void>;
  deleteMemberCompany: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState<MenuType>('home');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bbsData, setBbsData] = useState<BBSEntry[]>(INITIAL_BBS_DATA);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    showSidebar: true,
    rollingImages: INITIAL_ROLLING_IMAGES,
    founderImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/founder.png',  // 설립자소개
    chairmanImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/kwon.png',    // 회장사소개
    logoImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/logo.png',
    adminPassword: 'password'
  });
  const [isAdmin, setIsAdminState] = useState(false);
  const [settingsRowId, setSettingsRowId] = useState<string | null>(null);
  const [memberCompanies, setMemberCompanies] = useState<MemberCompany[]>([]);

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
          setSettingsRowId(data.id);
        }

        // 3) 회원사 목록 로딩
        const { data: companies, error: companiesError } = await supabase
          .from('member_companies')
          .select('*')
          .order('order_index', { ascending: true });

        if (!companiesError && companies) {
          setMemberCompanies(companies);
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

  const addBbsEntry = useCallback((entry: Omit<BBSEntry, 'id' | 'date'>) => {
    const newEntry: BBSEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setBbsData(prev => [newEntry, ...prev]);
  }, []);

  const updateBbsEntry = useCallback((id: number, updates: Partial<BBSEntry>) => {
    setBbsData(prev => prev.map(entry =>
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  }, []);

  const deleteBbsEntry = useCallback((id: number) => {
    setBbsData(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const updateRollingImage = useCallback((id: number, url: string, link?: string) => {
    setSettings(prev => ({
      ...prev,
      rollingImages: prev.rollingImages.map(img =>
        img.id === id ? { ...img, url, link: link ?? img.link } : img
      )
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

  const updateAdminPassword = useCallback((password: string) => {
    setSettings(prev => ({ ...prev, adminPassword: password }));
  }, []);

  const addInquiry = useCallback((inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  }, []);

  const deleteInquiry = useCallback((id: number) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  }, []);

  const answerInquiry = useCallback((id: number, answer: string) => {
    setInquiries(prev => prev.map(inq =>
      inq.id === id ? { ...inq, answer, status: 'answered' as const } : inq
    ));
  }, []);

  const askAI = useCallback(async (question: string): Promise<string> => {
    try {
      setIsSyncing(true);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API 키가 설정되지 않았습니다.");
      }

      const genAI = new GoogleGenAI({ apiKey });

      const prompt = `당신은 한국 공공조달 혁신 연구원(KPII)의 AI 어시스턴트입니다.
다음 질문에 대해 간결하고 전문적으로 답변해주세요:

질문: ${question}

답변은 3-4문장으로 요약하고, 필요하면 링크나 추가 정보를 제안해주세요.`;

      const response = await genAI.models.generate({
        model: "gemini-2.0-flash-exp",
        prompt,
        config: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      });

      if (!response?.text) {
        throw new Error("AI 응답을 받지 못했습니다.");
      }

      return response.text;
    } catch (error) {
      console.error("AI 질의 실패:", error);
      throw new Error("AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // 회원사 추가
  const addMemberCompany = useCallback(async (company: Omit<MemberCompany, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('member_companies')
        .insert([company])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setMemberCompanies(prev => [...prev, data].sort((a, b) => a.order_index - b.order_index));
      }
    } catch (e) {
      console.error('회원사 추가 실패:', e);
      alert('회원사 추가에 실패했습니다.');
    }
  }, []);

  // 회원사 수정
  const updateMemberCompany = useCallback(async (id: string, updates: Partial<MemberCompany>) => {
    try {
      const { data, error } = await supabase
        .from('member_companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setMemberCompanies(prev => 
          prev.map(c => c.id === id ? data : c).sort((a, b) => a.order_index - b.order_index)
        );
      }
    } catch (e) {
      console.error('회원사 수정 실패:', e);
      alert('회원사 수정에 실패했습니다.');
    }
  }, []);

  // 회원사 삭제
  const deleteMemberCompany = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('member_companies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMemberCompanies(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error('회원사 삭제 실패:', e);
      alert('회원사 삭제에 실패했습니다.');
    }
  }, []);

  const value: AppContextType = {
    currentMenu,
    setCurrentMenu,
    isAdmin,
    setIsAdmin,
    isSyncing,
    bbsData,
    addBbsEntry,
    updateBbsEntry,
    deleteBbsEntry,
    settings,
    updateRollingImage,
    updateProfileImage,
    updateAdminPassword,
    inquiries,
    addInquiry,
    deleteInquiry,
    answerInquiry,
    askAI,
    memberCompanies,
    addMemberCompany,
    updateMemberCompany,
    deleteMemberCompany,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(
