import { cva } from 'class-variance-authority';

export const bookmarkCountVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      plain: 'text-text-tertiary',
      filled: 'rounded-full bg-surface-muted text-text-secondary',
      outline: 'rounded-full bg-surface-card border border-border-strong text-text-tertiary',
    },
    size: {
      sm: 'gap-1 typo-caption',
      md: 'gap-1.5 typo-label-m',
      lg: 'gap-2 typo-label-l',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: ['filled', 'outline'], size: 'sm', class: 'px-2 py-1' },
    { variant: ['filled', 'outline'], size: 'md', class: 'px-3 py-1.5' },
    { variant: ['filled', 'outline'], size: 'lg', class: 'px-3.5 py-2' },
    { variant: 'plain', active: true, class: 'text-text-brand' },
    { variant: 'filled', active: true, class: 'bg-surface-brand text-text-on-brand' },
    { variant: 'outline', active: true, class: 'border-border-brand text-text-brand' },
  ],
  defaultVariants: {
    variant: 'plain',
    size: 'sm',
    active: false,
  },
});
