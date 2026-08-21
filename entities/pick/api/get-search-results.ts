import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#68 후속): 백엔드 연동 시 실제 검색 API(GET /search?q=)로 교체
 *
 * 현재는 mock pick의 title, tags, 장소명을 대상으로 대소문자 무시 부분 일치 검색합니다.
 */
export async function getSearchResults(query: string): Promise<Pick[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  return mockPicks.filter((pick) => {
    const haystack = [pick.title, ...pick.tags, ...pick.places.map((item) => item.place.name)]
      .join(' ')
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}
