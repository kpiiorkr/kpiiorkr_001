import { BBSEntry, RollingImage, MenuType } from './types.ts';

export const INITIAL_BBS_DATA: BBSEntry[] = [
  // 공지사항 Migration
  {
    id: 'n1',
    category: '공지사항',
    title: '[안내] 한국프로세스혁신협회 정관 개정 및 이사회 개최',
    content: '협회의 지속적인 발전을 위해 정관 일부를 개정하고 관련 이사회를 개최합니다. 자세한 사항은 사무국으로 문의 바랍니다.',
    author: '관리자',
    date: '2024-05-10',
  },
  {
    id: 'n2',
    category: '공지사항',
    title: '2024년 상반기 혁신 프로세스 교육생 모집 안내',
    content: '실무 중심의 RPA 및 프로세스 마이닝 교육 과정을 개설하오니 많은 지원 바랍니다.',
    author: '관리자',
    date: '2024-04-22',
  },
  {
    id: 'n3',
    category: '공지사항',
    title: '홈페이지 리뉴얼 및 개인정보 처리방침 변경 안내',
    content: '보다 나은 서비스 제공을 위해 홈페이지를 리뉴얼하였습니다. 이에 따른 개인정보 처리방침 변경 내용을 확인해 주시기 바랍니다.',
    author: '관리자',
    date: '2024-03-01',
  },
  // 사회공헌활동 (기존 주요활동)
  {
    id: 'a1',
    category: '사회공헌활동',
    title: '사회공헌 활동: 디지털 취약계층 교육 지원',
    content: '지역 사회 디지털 격차 해소를 위해 시니어 대상 스마트 기기 활용 교육을 실시하였습니다. 참여해 주신 회원사 분들께 감사드립니다.',
    author: '관리자',
    date: '2024-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'a2',
    category: '사회공헌활동',
    title: '제3회 프로세스 혁신 세미나 (Samsung R&D 캠퍼스)',
    content: '국내 유수의 IT 리더들이 참여한 가운데 2024 DX 전망 세미나를 성공적으로 마쳤습니다.',
    author: '관리자',
    date: '2024-03-28',
    imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_ROLLING_IMAGES: RollingImage[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600', link: '#' },
  { id: 2, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600', link: '#' },
  { id: 3, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600', link: '#' },
];

export const MENUS: MenuType[] = [
  '협회소개',
  '공지사항',
  '사회공헌활동',
  '자료실',
  '회장사소개',
  '회원사소개',
  '설립자소개',
  'Contact us'
];