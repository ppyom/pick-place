import { mockPlaces } from '@/entities/place/model/mock';

import { ApiError } from '@/shared/api';
import { sleep } from '@/shared/utils/sleep';

import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';
import { MOCK_CURRENT_USER_ID } from './get-my-picks';

export interface CreatePickPlacePayload {
  placeId: string;
  memo?: string;
}

export interface CreatePickPayload {
  title: string;
  description?: string;
  tags: string[];
  isPublic: boolean;
  places: CreatePickPlacePayload[];
}

/**
 * TODO(#77): 백엔드 연동 시 실제 생성 API(POST /picks)로 교체
 *
 * 현재는 네트워크 요청 없이 지연만 흉내내는 mock입니다.
 * - 생성한 Pick을 mock 목록 맨 앞에 추가해서 Pick 상세/내 Pick에서 바로 확인할 수 있습니다. (메모리 한정, 새로고침 시 초기화)
 * - `Pick` 타입에 공개 여부 필드가 아직 없어 `isPublic`은 저장하지 않습니다. 필드가 확정되면 함께 반영합니다.
 */
export async function createPick(payload: CreatePickPayload): Promise<Pick> {
  await sleep(500);

  const places = payload.places.map(({ placeId, memo }) => {
    const place = mockPlaces.find((item) => item.id === placeId);
    if (!place) {
      throw new ApiError('장소를 찾을 수 없습니다', 404, 'PLACE_NOT_FOUND');
    }

    return { place, memo: memo || undefined };
  });

  const author = mockPicks.find((pick) => pick.author.id === MOCK_CURRENT_USER_ID)?.author ?? {
    id: MOCK_CURRENT_USER_ID,
    name: '나',
  };

  const pick: Pick = {
    id: `pick-${mockPicks.length + 1}`,
    title: payload.title,
    description: payload.description || undefined,
    tags: payload.tags,
    author,
    places,
    bookmarkCount: 0,
    isBookmarked: false,
    createdAt: new Date().toISOString(),
  };

  mockPicks.unshift(pick);

  return pick;
}
