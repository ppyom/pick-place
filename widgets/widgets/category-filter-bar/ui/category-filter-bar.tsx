'use client';

import { Chip } from '@/shared/ui/chip';
import { cn } from '@/shared/utils/cn';

interface Category {
  id: string;
  label: string;
}

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategoryFilterBar({ categories, selectedId, onSelect, className }: Props) {
  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden',
        className,
      )}
      style={{ scrollbarWidth: 'none' }}
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          selected={category.id === selectedId}
          onClick={() => onSelect(category.id)}
          className="shrink-0"
        >
          {category.label}
        </Chip>
      ))}
    </div>
  );
}
