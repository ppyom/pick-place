import { mockPicks } from '../model/mock';
import type { Pick } from '../model/types';

/**
 * TODO(#76 후속): 백엔드 연동 시 실제 API(GET /places/:id/picks)로 교체
 */
export async function getPicksByPlace(placeId: string): Promise<Pick[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockPicks.filter((pick) => pick.places.some((item) => item.place.id === placeId));
}
