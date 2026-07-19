import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  selected?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function OnboardingChip({ selected = false, icon, children, className, ...props }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'flex flex-col items-center gap-1.5 rounded-lg border transition-colors',
        'typo-label-l py-4',
        selected
          ? 'bg-surface-brand border-border-brand text-text-on-brand hover:bg-primitive-primary-400 active:bg-primitive-primary-300'
          : 'bg-surface-card border-border-strong text-text-tertiary hover:bg-primitive-neutral-50 active:bg-primitive-neutral-100',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
