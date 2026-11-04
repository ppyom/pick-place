import type { Pick } from '@/entities/pick';

import type { PickFormValues } from './schema';

/** 기존 Pick을 수정 폼의 초기값으로 변환합니다. */
export function pickToFormValues(pick: Pick): PickFormValues {
  return {
    title: pick.title,
    description: pick.description ?? '',
    tags: pick.tags,
    isPublic: pick.isPublic ?? true,
    places: pick.places.map(({ place, memo }) => ({ place, memo: memo ?? '' })),
  };
}
