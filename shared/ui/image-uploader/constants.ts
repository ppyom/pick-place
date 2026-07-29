import { cva } from 'class-variance-authority';

export const imageUploaderVariants = cva(
  'relative flex items-center justify-center overflow-hidden bg-surface-secondary transition-colors',
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
      size: {
        sm: 'size-16',
        md: 'size-24',
        lg: 'size-32',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer hover:brightness-95',
      },
    },
    defaultVariants: {
      shape: 'circle',
      size: 'md',
      disabled: false,
    },
  },
);

export const ICON_SIZES = {
  sm: 'md',
  md: 'lg',
  lg: 'lg',
} as const;
