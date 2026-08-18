import { cva } from 'class-variance-authority';

export const navItemVariants = cva(
  'flex flex-col items-center justify-center gap-0.5 typo-caption',
  {
    variants: {
      active: {
        true: 'text-text-brand',
        false: 'text-text-disabled',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
