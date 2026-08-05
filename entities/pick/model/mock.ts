import { mockPlaces } from '@/entities/place/model/mock';

import type { Pick } from './types';

export const mockPicks: Pick[] = [
  {
    id: 'pick-1',
    title: '성수동 조용한 카페 모음',
    description: '작업하기 좋은 성수동 카페 리스트',
    tags: ['카페', '성수동', '작업하기좋은'],
    author: {
      id: 'user-1',
      name: 'jb',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    places: [
      { place: mockPlaces[0], memo: '노트북 펼치기 좋은 2층 자리 있음' },
      { place: mockPlaces[1], memo: '커피가 맛있어서 자주 감' },
      { place: mockPlaces[2], memo: '빵이 유명한데 오후엔 품절 잦음' },
    ],
    bookmarkCount: 128,
    createdAt: '2026-07-20T09:00:00.000Z',
  },
  {
    id: 'pick-2',
    title: '혼자 가기 좋은 을지로 맛집',
    tags: ['맛집', '을지로'],
    author: {
      id: 'user-2',
      name: 'hana',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    places: [{ place: mockPlaces[0], memo: '혼밥하기 편함' }],
    bookmarkCount: 42,
    createdAt: '2026-07-28T13:30:00.000Z',
  },
];
