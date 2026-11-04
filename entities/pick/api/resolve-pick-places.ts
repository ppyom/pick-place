import { mockPlaces } from '@/entities/place/model/mock';

import { ApiError } from '@/shared/api';

import type { PickPlaceItem } from '../model/types';

/** TODO(#77): 백엔드 연동 시 제거. mock에서만 placeId로 장소 정보를 채우기 위한 헬퍼입니다. */
export function resolvePickPlaces(places: { placeId: string; memo?: string }[]): PickPlaceItem[] {
  return places.map(({ placeId, memo }) => {
    const place = mockPlaces.find((item) => item.id === placeId);
    if (!place) {
      throw new ApiError('장소를 찾을 수 없습니다', 404, 'PLACE_NOT_FOUND');
    }

    return { place, memo: memo || undefined };
  });
}
