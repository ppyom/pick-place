import { useState } from 'react';

import { BookmarkCount } from '@/entities/pick';

import { cn } from '@/shared/utils/cn';

import { useToggleBookmark } from '../model/use-toggle-bookmark';

interface Props {
  pickId: string;
  initialCount: number;
  initialBookmarked?: boolean;
  className?: string;
}

export function BookmarkToggleButton({
  pickId,
  initialCount,
  initialBookmarked = false,
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
      <BookmarkCount count={count} active={isBookmarked} />
    </button>
  );
}
