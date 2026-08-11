import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-caption text-text-tertiary', className)} {...props} />;
}
