import Link from 'next/link';

import { type Pick } from '@/entities/pick';

import { Avatar } from '@/shared/ui/avatar';
import { CollageThumbnail } from '@/shared/ui/collage-thumbnail';
import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

interface Props {
  pick: Pick;
  className?: string;
}

export function PickListItem({ pick, className }: Props) {
  return (
    <Link href={`/picks/${pick.id}`} className={cn('flex items-center gap-3 px-4 py-3', className)}>
      <CollageThumbnail
        images={pick.places.map((item) => item.place.thumbnail)}
        alt={pick.title}
        className="size-16 shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="typo-label-l text-text-primary line-clamp-2">{pick.title}</span>
        <div className="flex items-center gap-1.5">
          <Avatar size="inline" src={pick.author.avatarUrl} alt={pick.author.name} />
          <span className="typo-body-s text-text-tertiary truncate">{pick.author.name}</span>
        </div>
      </div>
      <Icon name="next" size="sm" className="text-text-tertiary shrink-0" />
    </Link>
  );
}
