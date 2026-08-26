'use client';

import { useRouter } from 'next/navigation';

import { BookmarkToggleButton } from '@/features/toggle-bookmark';

import { PlaceItem, usePick } from '@/entities/pick';

import { ApiError } from '@/shared/api';
import { AppBar } from '@/shared/ui/app-bar';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { CollageThumbnail } from '@/shared/ui/collage-thumbnail';
import { ShareButton } from '@/shared/ui/share-button';
import { Tag } from '@/shared/ui/tag';

interface Props {
  id: string;
}

export function PickDetailContent({ id }: Props) {
  const router = useRouter();
  const { data: pick, isLoading, isError, error } = usePick(id);

  if (isError) {
    const isNotFound = error instanceof ApiError && error.status === 404;

    return (
      <div className="container-app min-h-dvh">
        <AppBar>
          <AppBar.Back onClick={() => router.back()} />
        </AppBar>

        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 pt-15">
          <p className="typo-body-s text-text-secondary text-center">
            {isNotFound ? '삭제되었거나 존재하지 않는 Pick이에요.' : '잠시 후 다시 시도해주세요.'}
          </p>
          <Button variant="outline" onClick={() => router.back()}>
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !pick) {
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
        <AppBar.Title>{pick.title}</AppBar.Title>
      </AppBar>

      <div className="space-y-4 pt-15">
        <CollageThumbnail
          images={pick.places.map((item) => item.place.thumbnail)}
          alt={pick.title}
          className="rounded-none"
        />

        <div className="flex flex-col gap-2 px-4">
          <p className="typo-title-m text-text-primary">{pick.title}</p>
          {pick.description && (
            <p className="typo-body-m text-text-secondary">{pick.description}</p>
          )}
        </div>

        {pick.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4">
            {pick.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        <div className="bg-surface-brand-subtle space-y-4 p-4">
          <div className="flex items-center gap-2">
            <Avatar size="base" src={pick.author.avatarUrl} alt={pick.author.name} />
            <div className="flex flex-col">
              <span className="typo-label-l text-text-primary">{pick.author.name}</span>
              <span className="typo-caption text-text-tertiary">
                {new Date(pick.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <BookmarkToggleButton
              className="flex-1"
              pickId={pick.id}
              initialCount={pick.bookmarkCount}
              initialBookmarked={pick.isBookmarked}
              variant="outline"
              size="md"
            />
            <ShareButton path={`/picks/${pick.id}`} title={pick.title} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4">
            <p className="typo-label-l">장소 목록</p>
            <p className="typo-caption text-text-brand">
              <span>{pick.places.length}</span>개
            </p>
          </div>
          {pick.places.map((item) => (
            <PlaceItem
              key={item.place.id}
              place={item.place}
              memo={item.memo}
              href={`/places/${item.place.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
