'use client';

import { useState } from 'react';
import { User } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

import {
  type AvatarSize,
  ICON_SIZE,
  INITIALS_LENGTH,
  SIZE_CLASS,
  TEXT_SIZE_CLASS,
} from './constants';

interface Props {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallbackText?: string;
  className?: string;
}

export function Avatar({ src, alt, size = 'base', fallbackText, className }: Props) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !src || imgError;
  const initials = fallbackText?.slice(0, INITIALS_LENGTH[size]).toUpperCase();

  return (
    <div
      className={cn(
        'bg-surface-secondary inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        SIZE_CLASS[size],
        className,
      )}
    >
      {showFallback ? (
        <span
          role="img"
          aria-label={alt}
          className={cn('text-text-secondary leading-none font-medium', TEXT_SIZE_CLASS[size])}
        >
          {initials ?? (
            <User size={ICON_SIZE[size]} className="text-text-tertiary" aria-hidden="true" />
          )}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}
