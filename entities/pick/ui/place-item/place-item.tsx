import Link from 'next/link';

import type { Place } from '@/entities/place';

import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Thumbnail } from '@/shared/ui/thumbnail';
import { cn } from '@/shared/utils/cn';

interface Props {
  place: Place;
  memo?: string;
  href?: string;
  onRemove?: () => void;
  onMemoChange?: (memo: string) => void;
  className?: string;
}

export function PlaceItem({ place, memo, href, onRemove, onMemoChange, className }: Props) {
  const editable = !!onMemoChange;

  const body = (
    <>
      <Thumbnail src={place.thumbnail} alt={place.name} className="size-16 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="typo-label-l text-text-primary truncate">{place.name}</span>
        {place.address && (
          <span className="typo-body-s text-text-tertiary truncate">{place.address}</span>
        )}
        {editable ? (
          <Input
            className="typo-body-s"
            leftIcon="memo"
            value={memo ?? ''}
            placeholder="메모를 남겨보세요"
            onChange={(event) => onMemoChange(event.target.value)}
            onClick={(event) => event.stopPropagation()}
          />
        ) : (
          memo && (
            <p className="typo-body-s text-text-secondary line-clamp-2 flex items-start gap-1">
              <Icon name="memo" size="sm" className="text-text-tertiary mt-0.5 shrink-0" />
              <span>{memo}</span>
            </p>
          )
        )}
      </div>
      {onRemove ? (
        <button
          type="button"
          aria-label={`${place.name} 삭제`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove();
          }}
          className="text-text-tertiary shrink-0 cursor-pointer"
        >
          <Icon name="x" size="sm" />
        </button>
      ) : (
        href && !editable && <Icon name="next" size="sm" className="text-text-tertiary shrink-0" />
      )}
    </>
  );

  if (href && !editable) {
    return (
      <Link href={href} className={cn('flex items-center gap-3 px-4 py-3', className)}>
        {body}
      </Link>
    );
  }

  return <div className={cn('flex items-center gap-3 px-4 py-3', className)}>{body}</div>;
}
