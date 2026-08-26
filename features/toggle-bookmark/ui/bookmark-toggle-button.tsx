import { useState } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { BookmarkCount, type bookmarkCountVariants } from '@/shared/ui/bookmark-count';
import { cn } from '@/shared/utils/cn';

import { useToggleBookmark } from '../model/use-toggle-bookmark';

interface Props extends Omit<VariantProps<typeof bookmarkCountVariants>, 'active' | 'size'> {
  pickId: string;
  initialCount: number;
  initialBookmarked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BookmarkToggleButton({
  pickId,
  initialCount,
  initialBookmarked = false,
  variant,
  size = 'sm',
  className,
}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [count, setCount] = useState(initialCount);
  const { mutate } = useToggleBookmark(pickId);

  function handleToggle() {
    const next = !isBookmarked;
    setIsBookmarked(next);
    setCount((prev) => (next ? prev + 1 : prev - 1));
    mutate(isBookmarked);
  }

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      onClick={handleToggle}
      className={cn('cursor-pointer', className)}
    >
      <BookmarkCount count={count} active={isBookmarked} variant={variant} size={size} />
    </button>
  );
}
