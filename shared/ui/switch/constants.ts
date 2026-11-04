import { cva, type VariantProps } from 'class-variance-authority';

export const switchVariants = cva(
  [
    'inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full',
    'outline-none transition-colors',
    'focus-visible:ring-border-focus focus-visible:ring-2 focus-visible:ring-offset-2',
  ],
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    compoundVariants: [
      { checked: false, disabled: false, class: 'bg-surface-muted' },
      { checked: false, disabled: true, class: 'bg-surface-muted' },
      { checked: true, disabled: false, class: 'bg-surface-brand' },
      { checked: true, disabled: true, class: 'bg-surface-brand-subtle' },
    ],
    defaultVariants: { checked: false, disabled: false },
  },
);

export const switchThumbVariants = cva(
  'pointer-events-none block size-5 rounded-full bg-white shadow-sm transition-transform',
  {
    variants: {
      checked: {
        true: 'translate-x-[18px]',
        false: 'translate-x-0.5',
      },
    },
    defaultVariants: { checked: false },
  },
);

export type SwitchVariantProps = VariantProps<typeof switchVariants>;
