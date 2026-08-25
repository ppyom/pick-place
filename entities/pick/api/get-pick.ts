import { ApiError } from '@/shared/api';

import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#75 후속): 백엔드 연동 시 실제 상세 API(GET /picks/:id)로 교체
 */
export async function getPick(id: string): Promise<Pick> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const pick = mockPicks.find((item) => item.id === id);
  if (!pick) {
    throw new ApiError('Pick을 찾을 수 없습니다', 404, 'PICK_NOT_FOUND');
  }

  return pick;
}
