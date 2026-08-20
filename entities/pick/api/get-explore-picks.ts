import { DEFAULT_PICK_CATEGORY_ID, PICK_CATEGORIES } from '../config/categories';
import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#67 후속): 백엔드 연동 시 실제 탐색 API(GET /explore?category=)로 교체
 *
 * 현재는 mock pick의 tags 필드가 카테고리 label을 포함하는지로 필터링합니다.
 */
export async function getExplorePicks(
  categoryId: string = DEFAULT_PICK_CATEGORY_ID,
): Promise<Pick[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (categoryId === DEFAULT_PICK_CATEGORY_ID) {
    return mockPicks;
  }

  const category = PICK_CATEGORIES.find((item) => item.id === categoryId);
  if (!category) {
    return mockPicks;
  }

  return mockPicks.filter((pick) => pick.tags.includes(category.label));
}
