import type { Place } from '@/entities/place';

export interface PickAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface PickPlaceItem {
  place: Place;
  memo?: string;
}

export interface Pick {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  /** 공개 여부. 값이 없으면 공개로 취급합니다. */
  isPublic?: boolean;
  author: PickAuthor;
  places: PickPlaceItem[];
  bookmarkCount: number;
  isBookmarked?: boolean;
  createdAt: string;
}
