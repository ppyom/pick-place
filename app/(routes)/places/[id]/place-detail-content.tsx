'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PickListItem } from '@/widgets/pick-list-item';

import { usePicksByPlace } from '@/entities/pick';
import { usePlace } from '@/entities/place';

import { ApiError } from '@/shared/api';
import { AppBar } from '@/shared/ui/app-bar';
import { BookmarkCount } from '@/shared/ui/bookmark-count';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { ShareButton } from '@/shared/ui/share-button';
import { Thumbnail } from '@/shared/ui/thumbnail';

interface Props {
  id: string;
}

export function PlaceDetailContent({ id }: Props) {
  const router = useRouter();
  const { data: place, isLoading, isError, error } = usePlace(id);
  const { data: picks } = usePicksByPlace(id);

  if (isError) {
    const isNotFound = error instanceof ApiError && error.status === 404;

    return (
      <div className="container-app min-h-dvh">
        <AppBar>
          <AppBar.Back onClick={() => router.back()} />
        </AppBar>

        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 pt-15">
          <p className="typo-body-s text-text-secondary text-center">
            {isNotFound ? '삭제되었거나 존재하지 않는 장소예요.' : '잠시 후 다시 시도해주세요.'}
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !place) {
    return (
      <div className="container-app min-h-dvh">
        <AppBar>
          <AppBar.Back onClick={() => router.back()} />
        </AppBar>

        <p className="typo-body-s text-text-secondary mt-15 py-16 text-center">
          불러오는 중이에요…
        </p>
      </div>
    );
  }

  return (
    <div className="container-app min-h-dvh pb-10">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>{place.name}</AppBar.Title>
      </AppBar>

      <div className="pt-15">
        <Thumbnail
          src={place.thumbnail}
          alt={place.name}
          className="aspect-square w-full rounded-none"
          sizes="480px"
        />

        <div className="flex flex-col gap-2 px-4 py-4">
          <p className="typo-title-m text-text-primary">{place.name}</p>
          {place.address && (
            <p className="typo-body-s text-text-tertiary flex items-center gap-1">
              <Icon name="location" size="sm" className="text-text-tertiary shrink-0" />
              <span>{place.address}</span>
            </p>
          )}
        </div>

        <div className="bg-surface-brand-subtle flex items-center gap-4 p-4">
          <Link href={`/picks/new?placeId=${place.id}`} className="flex-1">
            <BookmarkCount
              count={place.bookmarkCount}
              variant="outline"
              size="md"
              className="w-full"
            />
          </Link>
          <ShareButton path={`/places/${place.id}`} title={place.name} size="md" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 pt-6 pb-2">
            <p className="typo-label-l">이 장소가 담긴 Pick</p>
            <p className="typo-caption text-text-brand">
              <span>{picks?.length ?? 0}</span>개
            </p>
          </div>
          {picks && picks.length > 0 ? (
            picks.map((pick) => <PickListItem key={pick.id} pick={pick} />)
          ) : (
            <p className="typo-body-s text-text-tertiary px-4 py-6 text-center">
              아직 이 장소가 담긴 Pick이 없어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
