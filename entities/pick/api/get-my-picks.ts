import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#57 후속): 백엔드 연동 시 세션의 실제 유저 ID 기반 요청으로 교체
 *
 * 현재는 세션 개념이 없어 mock 데이터의 첫 번째 작성자를 "나"로 취급합니다.
 */
export const MOCK_CURRENT_USER_ID = 'user-1';

export async function getMyPicks(): Promise<Pick[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockPicks.filter((pick) => pick.author.id === MOCK_CURRENT_USER_ID);
}
