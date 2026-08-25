import Link from 'next/link';

import { ShareButton } from '@/features/share-pick';
import { BookmarkToggleButton } from '@/features/toggle-bookmark';

import { type Pick } from '@/entities/pick';

import { Avatar } from '@/shared/ui/avatar';
import { Icon } from '@/shared/ui/icon';
import { Tag } from '@/shared/ui/tag';
import { cn } from '@/shared/utils/cn';

interface Props {
  pick: Pick;
  onMoreClick?: () => void;
  className?: string;
}

export function FeedCard({ pick, onMoreClick, className }: Props) {
  const representativePlace = pick.places[0];

  return (
    <div className={cn('bg-surface-card flex w-full flex-col gap-3 py-4', className)}>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Avatar size="base" src={pick.author.avatarUrl} alt={pick.author.name} />
          <div className="flex flex-col">
            <span className="typo-label-l text-text-primary">{pick.author.name}</span>
            <span className="typo-caption text-text-tertiary">
              {new Date(pick.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button type="button" aria-label="더보기" onClick={onMoreClick} className="cursor-pointer">
          <Icon name="menu" size="sm" className="text-text-tertiary" />
        </button>
      </div>

      {representativePlace && (
        <div className="rounded-radius-m relative overflow-hidden">
          <img
            src={representativePlace.place.thumbnail}
            alt={representativePlace.place.name}
            className="aspect-square w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-end gap-1 bg-linear-to-t from-black/90 to-transparent p-3">
            <span className="typo-title-m text-white">{representativePlace.place.name}</span>
            {representativePlace.place.address && (
              <span className="typo-body-s text-white/80">{representativePlace.place.address}</span>
            )}
            {representativePlace.memo && (
              <p className="flex gap-2">
                <Icon name="memo" size="sm" className="mt-1 shrink-0 text-white" />
                <span className="typo-body-m text-white">{representativePlace.memo}</span>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1 px-4">
        <Link href={`/picks/${pick.id}`} className="typo-title-m text-text-primary">
          {pick.title}
        </Link>
        {pick.description && (
          <p className="typo-body-m text-text-secondary line-clamp-2">{pick.description}</p>
        )}
      </div>

      {pick.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4">
          {pick.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between px-4">
        <BookmarkToggleButton
          pickId={pick.id}
          initialCount={pick.bookmarkCount}
          initialBookmarked={pick.isBookmarked}
          variant="outline"
        />

        <ShareButton pickId={pick.id} title={pick.title} />
      </div>
    </div>
  );
}
