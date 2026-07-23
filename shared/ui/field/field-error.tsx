import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface Props extends Omit<ComponentProps<'p'>, 'children'> {
  children?: ReactNode;
}

export function FieldError({ className, children, ...props }: Props) {
  if (!children) return null;

  return (
    <p role="alert" className={cn('text-caption text-status-error-text', className)} {...props}>
      {children}
    </p>
  );
}
