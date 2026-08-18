import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

import { type ChipVariantProps, chipVariants } from './constants';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>, ChipVariantProps {
  children: ReactNode;
}

export function Chip({
  children,
  className,
  size = 'md',
  readonly,
  selected,
  onClick,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(chipVariants({ size, readonly, selected }), className)}
      aria-pressed={readonly ? undefined : (selected ?? undefined)}
      aria-disabled={readonly ?? undefined}
      onClick={readonly ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
}
