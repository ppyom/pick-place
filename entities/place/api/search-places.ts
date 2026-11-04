import { sleep } from '@/shared/utils/sleep';

import { mockPlaces } from '../model/mock';
import type { Place } from '../model/types';

/**
 * TODO(#77): 백엔드 연동 시 실제 장소 검색 API(GET /places?q=)로 교체
 *
 * 현재는 mock 장소의 이름, 주소, 카테고리를 대상으로 대소문자 무시 부분 일치 검색합니다.
 * 검색어가 비어 있으면 전체 목록을 반환합니다. (바텀시트 최초 진입 시 노출용)
 */
export async function searchPlaces(query: string): Promise<Place[]> {
  await sleep(300);

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return mockPlaces;

  return mockPlaces.filter((place) =>
    [place.name, place.address, place.category].join(' ').toLowerCase().includes(trimmed),
  );
}
