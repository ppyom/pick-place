import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

const PAGE_SIZE = 4;
const MOCK_PAGE_COUNT = 5;

export interface FeedPage {
  items: Pick[];
  nextCursor: number | null;
}

/**
 * TODO(#66 후속): 백엔드 연동 시 실제 피드 API(GET /feed?cursor=)로 교체
 *
 * mock pick이 4건뿐이라 무한 스크롤 데모를 위해 순환시켜 여러 페이지 분량을 만듭니다.
 */
function buildMockFeedSource(): Pick[] {
  return Array.from({ length: MOCK_PAGE_COUNT * PAGE_SIZE }, (_, index) => {
    const base = mockPicks[index % mockPicks.length];

    return {
      ...base,
      id: `${base.id}-feed-${index}`,
      createdAt: new Date(Date.parse(base.createdAt) - index * 60 * 60 * 1000).toISOString(),
    };
  });
}

const mockFeedSource = buildMockFeedSource();

export async function getFeed(cursor = 0): Promise<FeedPage> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const items = mockFeedSource.slice(cursor, cursor + PAGE_SIZE);
  const nextCursor = cursor + PAGE_SIZE < mockFeedSource.length ? cursor + PAGE_SIZE : null;

  return { items, nextCursor };
}
