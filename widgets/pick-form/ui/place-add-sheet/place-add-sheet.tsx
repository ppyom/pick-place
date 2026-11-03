'use client';

import { useState } from 'react';

import { type Place, useSearchPlaces } from '@/entities/place';

import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Thumbnail } from '@/shared/ui/thumbnail';
import { cn } from '@/shared/utils/cn';

import { usePlaceSelection } from '../../model/use-place-selection';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** CTA를 눌렀을 때 변경 내용을 전달 (새로 선택한 장소 / 선택 해제한 기존 장소 id) */
  onConfirm: (result: { added: Place[]; removedIds: string[] }) => void;
  /** 이미 Pick에 담긴 장소 id. 선택된 상태로 표시되고, 해제하면 삭제 대상이 됩니다. */
  addedPlaceIds?: string[];
}

function getCtaLabel(addedCount: number, removedCount: number) {
  if (addedCount > 0 && removedCount > 0) return `${addedCount}개 추가 · ${removedCount}개 삭제`;
  if (addedCount > 0) return `${addedCount}개 추가`;
  if (removedCount > 0) return `${removedCount}개 삭제`;
  return '장소를 선택해주세요';
}

export function PlaceAddSheet({ isOpen, onClose, onConfirm, addedPlaceIds = [] }: Props) {
  const [query, setQuery] = useState('');
  const { isSelected, toggle, reset, added, removedIds, addedCount, removedCount } =
    usePlaceSelection(addedPlaceIds);
  const { data, isPending, isError } = useSearchPlaces(query);

  const places = data ?? [];

  function close() {
    setQuery('');
    reset();
    onClose();
  }

  const hasChanges = addedCount > 0 || removedCount > 0;

  function handleConfirm() {
    if (!hasChanges) return;

    onConfirm({ added, removedIds });
    close();
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={close} className="h-[85vh]">
      <BottomSheet.Title>장소 추가</BottomSheet.Title>

      <BottomSheet.Body className="flex flex-col gap-2 pt-2">
        <Input
          leftIcon="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="장소 검색"
          aria-label="장소 검색"
        />

        {isPending ? (
          <p className="typo-body-s text-text-tertiary py-8 text-center">불러오는 중이에요</p>
        ) : isError ? (
          <p className="typo-body-s text-text-tertiary py-8 text-center">
            장소를 불러오지 못했어요
          </p>
        ) : places.length === 0 ? (
          <p className="typo-body-s text-text-tertiary py-8 text-center">검색 결과가 없어요</p>
        ) : (
          <ul className="flex flex-col">
            {places.map((place) => {
              const checked = isSelected(place.id);

              return (
                <li key={place.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggle(place)}
                    className={cn('flex w-full items-center gap-3 py-3 text-left')}
                  >
                    <Thumbnail
                      src={place.thumbnail}
                      alt={place.name}
                      className="size-16 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="typo-label-l text-text-primary truncate">{place.name}</span>
                      {place.address && (
                        <span className="typo-body-s text-text-tertiary truncate">
                          {place.address}
                        </span>
                      )}
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-full border',
                        checked
                          ? 'bg-surface-brand border-border-brand text-text-on-brand'
                          : 'border-border-strong',
                      )}
                    >
                      {checked && <Icon name="check" size="sm" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </BottomSheet.Body>

      <BottomSheet.Footer>
        <Button className="w-full" disabled={!hasChanges} onClick={handleConfirm}>
          {getCtaLabel(addedCount, removedCount)}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
}
