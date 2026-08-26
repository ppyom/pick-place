import { type VariantProps } from 'class-variance-authority';

import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { bookmarkCountVariants } from './constants';

interface Props extends Omit<VariantProps<typeof bookmarkCountVariants>, 'active' | 'size'> {
  count: number;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BookmarkCount({ count, active = false, variant, size = 'sm', className }: Props) {
  return (
    <div className={cn(bookmarkCountVariants({ variant, size, active }), className)}>
      <Icon name="save" size={size} className={cn(active && 'fill-current')} />
      <span>{count.toLocaleString()}</span>
    </div>
  );
}
