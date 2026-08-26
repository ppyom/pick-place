import { ApiError } from '@/shared/api';

import { mockPlaces } from '../model/mock';
import type { Place } from '../model/types';

/**
 * TODO(#76 후속): 백엔드 연동 시 실제 상세 API(GET /places/:id)로 교체
 */
export async function getPlace(id: string): Promise<Place> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const place = mockPlaces.find((item) => item.id === id);
  if (!place) {
    throw new ApiError('장소를 찾을 수 없습니다', 404, 'PLACE_NOT_FOUND');
  }

  return place;
}
