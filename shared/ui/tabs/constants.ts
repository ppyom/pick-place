import { cva } from 'class-variance-authority';

export const tabItemVariants = cva(
  'typo-label-l flex h-12 flex-1 items-center justify-center border-b-2 transition-colors',
  {
    variants: {
      active: {
        true: 'text-text-brand border-border-brand',
        false: 'text-text-tertiary border-transparent',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
