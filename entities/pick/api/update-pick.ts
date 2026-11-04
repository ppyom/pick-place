import { ApiError } from '@/shared/api';
import { sleep } from '@/shared/utils/sleep';

import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';
import type { CreatePickPayload } from './create-pick';
import { MOCK_CURRENT_USER_ID } from './get-my-picks';
import { resolvePickPlaces } from './resolve-pick-places';

export type UpdatePickPayload = CreatePickPayload;

/**
 * TODO(#77): 백엔드 연동 시 실제 수정 API(PUT /picks/:id)로 교체
 *
 * 현재는 네트워크 요청 없이 지연만 흉내내는 mock입니다.
 * - mock 목록의 해당 Pick을 제자리에서 교체합니다. (메모리 한정, 새로고침 시 초기화)
 * - id, 작성자, 북마크 수/상태, 작성일은 유지합니다.
 * - 권한 검사는 세션 대신 `MOCK_CURRENT_USER_ID` 기준입니다. 실제로는 서버가 판단합니다.
 */
export async function updatePick(id: string, payload: UpdatePickPayload): Promise<Pick> {
  await sleep(500);

  const index = mockPicks.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new ApiError('Pick을 찾을 수 없습니다', 404, 'PICK_NOT_FOUND');
  }

  const existing = mockPicks[index];
  if (existing.author.id !== MOCK_CURRENT_USER_ID) {
    throw new ApiError('수정 권한이 없습니다', 403, 'FORBIDDEN');
  }

  const updated: Pick = {
    ...existing,
    title: payload.title,
    description: payload.description || undefined,
    tags: payload.tags,
    isPublic: payload.isPublic,
    places: resolvePickPlaces(payload.places),
  };

  mockPicks[index] = updated;

  return updated;
}
