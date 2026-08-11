import { BookmarkToggleButton } from '@/features/toggle-bookmark';

import { type Pick } from '@/entities/pick';

import { Avatar } from '@/shared/ui/avatar';
import { CollageThumbnail } from '@/shared/ui/collage-thumbnail';
import { cn } from '@/shared/utils/cn';

interface Props {
  pick: Pick;
  className?: string;
}

export function PickGridCard({ pick, className }: Props) {
  return (
    <div className={cn('bg-surface-card flex w-full flex-col', className)}>
      <CollageThumbnail
        images={pick.places.map((item) => item.place.thumbnail)}
        className="rounded-radius-m"
      />
      <div className="flex flex-1 flex-col justify-between gap-2 p-4 pt-2.5">
        <p className="typo-body-m text-text-primary line-clamp-2">{pick.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar size="inline" src={pick.author.avatarUrl} alt={pick.author.name} />
            <span className="typo-label-m text-text-secondary line-clamp-1">
              {pick.author.name}
            </span>
          </div>
          <BookmarkToggleButton
            pickId={pick.id}
            initialCount={pick.bookmarkCount}
            initialBookmarked={pick.isBookmarked}
          />
        </div>
      </div>
    </div>
  );
}
