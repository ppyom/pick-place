import { cva, type VariantProps } from 'class-variance-authority';

const statusStyles = {
  default: 'focus-visible:ring-border-focus',
  error: 'bg-status-error-background ring-status-error-border',
};

export const textareaVariants = cva(
  [
    'w-full resize-none rounded-lg px-3 py-2 outline-none typo-body-m',
    'bg-surface-brand-subtle text-text-primary',
    'ring-1 ring-transparent transition-[background-color,box-shadow]',
    'placeholder:text-text-tertiary',
    'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled',
  ],
  {
    variants: {
      status: statusStyles,
    },
    defaultVariants: { status: 'default' },
  },
);

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
export const TEXTAREA_STATUSES = Object.keys(statusStyles) as (keyof typeof statusStyles)[];
