import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/utils/cn';

import { type TextareaVariantProps, textareaVariants } from './constants';

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, Pick<TextareaVariantProps, 'status'> {}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, status, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={status === 'error' || undefined}
        className={cn(textareaVariants({ status }), className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
