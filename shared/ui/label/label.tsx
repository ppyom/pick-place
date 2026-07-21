import type { LabelHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface Props extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'htmlFor'> {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

export function Label({ children, htmlFor, required, ...props }: Props) {
  return (
    <label
      className={cn(
        'typo-label-m text-text-primary',
        required &&
          'after:text-status-error-text after:ml-0.5 after:align-super after:text-xs after:content-["*"]',
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
}
