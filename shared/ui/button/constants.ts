import { cva, type VariantProps } from 'class-variance-authority';

import type { IconSize } from '@/shared/ui/icon';

const variantStyles = {
  primary:
    'bg-surface-brand text-text-on-brand hover:bg-primitive-primary-600 active:bg-primitive-primary-700',
  secondary:
    'bg-primitive-secondary-300 text-text-on-secondary hover:bg-primitive-secondary-400 active:bg-primitive-secondary-500',
  outline:
    'bg-surface-card border border-border-strong text-text-tertiary hover:bg-primitive-neutral-50 active:bg-primitive-neutral-100',
  text: 'bg-transparent text-text-tertiary hover:bg-primitive-neutral-50 active:bg-primitive-neutral-100',
};

const sizeStyles = {
  sm: 'typo-label-m h-9 px-3 gap-2',
  md: 'typo-label-l h-11 px-4 gap-3',
  lg: 'typo-label-l h-13 px-6 gap-3',
  icon: 'p-3',
};

export const buttonVariants = cva(
  'flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: variantStyles,
      size: sizeStyles,
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export const BUTTON_VARIANTS = Object.keys(variantStyles) as (keyof typeof variantStyles)[];
export const BUTTON_SIZES = Object.keys(sizeStyles) as (keyof typeof sizeStyles)[];

export const LOADING_ICON_SIZE: Record<NonNullable<ButtonVariantProps['size']>, IconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  icon: 'sm',
};
