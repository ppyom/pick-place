import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

interface Props {
  children: string;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, onRemove, className }: Props) {
  return (
    <span
      className={cn(
        'typo-caption text-text-primary bg-surface-brand-subtle flex items-center gap-1 rounded-full py-1 pl-2',
        onRemove ? 'pr-1' : 'pr-2',
        className,
      )}
    >
      #{children}
      {onRemove && (
        <button
          type="button"
          aria-label={`${children} 태그 삭제`}
          onClick={onRemove}
          className="text-text-tertiary flex size-4 shrink-0 cursor-pointer items-center justify-center"
        >
          <Icon name="x" size="sm" />
        </button>
      )}
    </span>
  );
}
