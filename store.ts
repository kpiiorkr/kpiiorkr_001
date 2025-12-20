import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BBSEntry, RollingImage, AppSettings, MenuType, Inquiry } from './types.ts';
import { INITIAL_BBS_DATA, INITIAL_ROLLING_IMAGES } from './constants.tsx';
import { supabase } from './lib/supabase';

const STORAGE_KEYS = {
  BBS: 'kpii_bbs_data',
  SETTINGS: 'kpii_settings',
  INQUIRIES: 'kpii_inquiries',
} as const;

interface AppContextType {
  bbsData: BBSEntry[];
  inquiries: Inquiry[];
  settings: AppSettings;
  isAdmin: boolean;
  isSyncing: boolean;
  setIsAdmin: (val: boolean) => void;
  addBBSEntry: (entry: Omit<BBSEntry, 'id' | 'createdAt'>) => void;
  updateBBSEntry: (id: string, updates: Partial<BBSEntry>) => void;
  deleteBBSEntry: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  deleteInquiry: (id: string) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  addRollingImage: (image: Omit<RollingImage, 'id'>) => void;
  updateRollingImage: (id: string, updates: Partial<RollingImage>) => void;
  deleteRollingImage: (id: string) => void;
  updateProfileImage: (type: 'founder' | 'chairman' | 'logo', url: string) => void;
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
    founderImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/founder.png',
    chairmanImageUrl: 'https://raw.githubusercontent.com/kpiiorkr/img/main/kwon.png',
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
          setSettingsRowId(data.id);
        }
      } catch (e) {
        console.error("Data recovery failed", e);
      } finally {
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

  const addBBSEntry = useCallback((entry: Omit<BBSEntry, 'id' | 'createdAt'>) => {
    const newEntry: BBSEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setBbsData(prev => [newEntry, ...prev]);
  }, []);

  const updateBBSEntry = useCallback((id: string, updates: Partial<BBSEntry>) => {
    setBbsData(prev => prev.map(entry =>
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  }, []);

  const deleteBBSEntry = useCallback((id: string) => {
    setBbsData(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const addInquiry = useCallback((inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  }, []);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const addRollingImage = useCallback((image: Omit<RollingImage, 'id'>) => {
    const newImage: RollingImage = { ...image, id: crypto.randomUUID() };
    setSettings(prev => ({
      ...prev,
      rollingImages: [...prev.rollingImages, newImage]
    }));
  }, []);

  const updateRollingImage = useCallback((id: string, updates: Partial<RollingImage>) => {
    setSettings(prev => ({
      ...prev,
      rollingImages: prev.rollingImages.map(img =>
        img.id === id ? { ...img, ...updates } : img
      )
    }));
  }, []);

  const deleteRollingImage = useCallback((id: string) => {
    setSettings(prev => ({
      ...prev,
      rollingImages: prev.rollingImages.filter(img => img.id !== id)
    }));
  }, []);

  const updateProfileImage = useCallback(
    async (type: 'founder' | 'chairman' | 'logo', url: string) => {
      // 1) 먼저 로컬 상태 업데이트 (UI 즉시 반영)
      setSettings(prev => ({ ...prev, [`${type}ImageUrl`]: url }));

      // 2) Supabase에도 저장
      try {
        if (!settingsRowId) return;

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

  const value: AppContextType = {
    bbsData,
    inquiries,
    settings,
    isAdmin,
    isSyncing,
    setIsAdmin,
    addBBSEntry,
    updateBBSEntry,
    deleteBBSEntry,
    addInquiry,
    deleteInquiry,
    updateSettings,
    addRollingImage,
    updateRollingImage,
    deleteRollingImage,
    updateProfileImage,
  };

  return React.createElement(AppContext.Provider, { value }, children);
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
