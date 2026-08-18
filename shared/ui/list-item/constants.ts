import { cva, type VariantProps } from 'class-variance-authority';

const variantStyles = {
  default: 'text-text-primary',
  danger: 'text-status-error-text',
};

export const listItemVariants = cva(
  'typo-body-s flex w-full items-center justify-between gap-3 px-4 py-3 rounded-md bg-surface-card text-left transition-colors',
  {
    variants: {
      variant: variantStyles,
      interactive: {
        true: 'hover:bg-primitive-neutral-100 cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:text-text-disabled',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  },
);

export type ListItemVariantProps = VariantProps<typeof listItemVariants>;

export const LIST_ITEM_VARIANTS = Object.keys(variantStyles) as (keyof typeof variantStyles)[];
