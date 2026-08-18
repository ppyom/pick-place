import { cva, type VariantProps } from 'class-variance-authority';

const statusStyles = {
  default: 'focus-visible:ring-border-focus',
  error: 'bg-status-error-background ring-status-error-border',
};

export const inputVariants = cva(
  [
    'h-12 w-full rounded-lg px-3 outline-none typo-body-m',
    'bg-surface-brand-subtle text-text-primary',
    'ring-1 ring-transparent transition-[background-color,box-shadow]',
    'placeholder:text-text-tertiary',
    'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled',
  ],
  {
    variants: {
      status: statusStyles,
      hasLeftIcon: { true: 'pl-9', false: '' },
    },
    defaultVariants: { status: 'default', hasLeftIcon: false },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
export const INPUT_STATUSES = Object.keys(statusStyles) as (keyof typeof statusStyles)[];

export const inputIconVariants = cva(
  'absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none',
  {
    variants: {
      status: {
        default: 'text-text-brand',
        error: 'text-status-error-text',
      },
    },
    defaultVariants: { status: 'default' },
  },
);
