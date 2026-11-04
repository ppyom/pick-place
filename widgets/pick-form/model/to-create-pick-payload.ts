import type { CreatePickPayload } from '@/entities/pick';

import type { PickFormValues } from './schema';

/** 폼 값을 createPick 요청 페이로드로 변환합니다. 빈 설명/메모는 보내지 않습니다. */
export function toCreatePickPayload(values: PickFormValues): CreatePickPayload {
  return {
    title: values.title,
    description: values.description || undefined,
    tags: values.tags,
    isPublic: values.isPublic,
    places: values.places.map(({ place, memo }) => ({
      placeId: place.id,
      memo: memo || undefined,
    })),
  };
}
