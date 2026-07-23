import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

export function Field({ className, ...props }: ComponentProps<'div'>) {
  return <div role="group" className={cn('flex flex-col gap-2', className)} {...props} />;
}
