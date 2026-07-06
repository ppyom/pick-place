import { cva, type VariantProps } from 'class-variance-authority';

const variantStyles = {
  filled:
    'bg-surface-brand text-text-on-brand hover:bg-primitive-primary-600 active:bg-primitive-primary-700',
  outline:
    'bg-surface-card border border-border-strong text-text-tertiary hover:bg-primitive-neutral-50 active:bg-primitive-neutral-100',
  soft: 'bg-surface-brand-subtle text-text-brand',
};

const sizeStyles = {
  sm: 'typo-label-m h-7 px-2 gap-0.5',
  md: 'typo-label-m h-9 px-3 gap-1',
};

export const chipVariants = cva('flex items-center justify-center rounded-full transition-colors', {
  variants: {
    readonly: {
      false: '',
      true: variantStyles.soft,
    },
    selected: {
      false: '',
      true: '',
    },
    size: sizeStyles,
  },
  defaultVariants: {
    readonly: false,
    selected: false,
    size: 'md',
  },
  compoundVariants: [
    { readonly: false, selected: false, class: variantStyles.outline },
    { readonly: false, selected: true, class: variantStyles.filled },
  ],
});

export type ChipVariantProps = VariantProps<typeof chipVariants>;

export const CHIP_SIZES = Object.keys(sizeStyles) as (keyof typeof sizeStyles)[];
