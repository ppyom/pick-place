import type { Place } from '@/entities/place';

export interface PickAuthor {
  id: string;
  name: string;
  avatarUrl: string;
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
  author: PickAuthor;
  places: PickPlaceItem[];
  bookmarkCount: number;
  createdAt: string;
}
