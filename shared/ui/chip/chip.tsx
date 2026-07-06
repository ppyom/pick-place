import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

import { type ChipVariantProps, chipVariants } from './constants';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>, ChipVariantProps {
  children: ReactNode;
}

export function Chip({ children, className, size = 'md', readonly, selected, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(chipVariants({ size, readonly, selected }), className)}
      aria-pressed={selected ?? undefined}
      disabled={readonly ?? undefined}
      {...props}
    >
      {children}
    </button>
  );
}
