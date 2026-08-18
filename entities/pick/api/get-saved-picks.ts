import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#57 후속): 백엔드 연동 시 실제 북마크 목록 API로 교체
 */
export async function getSavedPicks(): Promise<Pick[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockPicks.filter((pick) => pick.isBookmarked);
}
