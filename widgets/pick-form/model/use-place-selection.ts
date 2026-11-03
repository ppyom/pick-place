'use client';

import { useState } from 'react';

import type { Place } from '@/entities/place';

/**
 * 장소 추가 바텀시트의 선택 로직.
 *
 * 이미 담긴 장소(addedPlaceIds)는 처음부터 선택된 상태이고, 해제하면 삭제 대상이 됩니다.
 * 사용자가 토글한 장소만 보관하고 선택 여부는 "기존 상태 XOR 토글 여부"로 계산하므로,
 * 검색 결과에서 사라져도 변경 내용이 유지되고 부모의 addedPlaceIds가 바뀌어도 어긋나지 않습니다.
 */
export function usePlaceSelection(addedPlaceIds: string[]) {
  const [toggled, setToggled] = useState<Place[]>([]);

  function isToggled(id: string) {
    return toggled.some((place) => place.id === id);
  }

  function isSelected(id: string) {
    return addedPlaceIds.includes(id) !== isToggled(id);
  }

  function toggle(place: Place) {
    setToggled((prev) =>
      prev.some((item) => item.id === place.id)
        ? prev.filter((item) => item.id !== place.id)
        : [...prev, place],
    );
  }

  function reset() {
    setToggled([]);
  }

  const added = toggled.filter((place) => !addedPlaceIds.includes(place.id));
  const removedIds = toggled.map((place) => place.id).filter((id) => addedPlaceIds.includes(id));

  return {
    isSelected,
    toggle,
    reset,
    added,
    removedIds,
    addedCount: added.length,
    removedCount: removedIds.length,
  };
}
