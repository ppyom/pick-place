export interface PickCategory {
  id: string;
  label: string;
}

export const DEFAULT_PICK_CATEGORY_ID = 'all';

export const PICK_CATEGORIES: PickCategory[] = [
  { id: 'all', label: '전체' },
  { id: 'food', label: '맛집' },
  { id: 'cafe', label: '카페' },
  { id: 'travel', label: '여행' },
  { id: 'nature', label: '자연' },
  { id: 'culture', label: '문화' },
  { id: 'shopping', label: '쇼핑' },
];
