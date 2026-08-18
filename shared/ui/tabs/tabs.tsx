import { cn } from '@/shared/utils/cn';

import { tabItemVariants } from './constants';

export interface TabItem {
  value: string;
  label: string;
}

interface Props {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className }: Props) {
  return (
    <div role="tablist" className={cn('border-border-default flex border-b', className)}>
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(tabItemVariants({ active }))}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
