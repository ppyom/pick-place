import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

interface RecentSearchListProps {
  items: string[];
  onItemClick?: (term: string) => void;
  onItemRemove?: (term: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function RecentSearchList({
  items,
  onItemClick,
  onItemRemove,
  onClearAll,
  className,
}: RecentSearchListProps) {
  const hasItems = items.length > 0;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="typo-label-l text-text-primary">최근 검색어</h2>
        {hasItems && (
          <button
            type="button"
            onClick={onClearAll}
            className="typo-label-m text-text-brand underline underline-offset-2"
          >
            전체삭제
          </button>
        )}
      </div>
      {hasItems ? (
        <ul>
          {items.map((term, index) => (
            <li key={`${term}-${index}`} className="flex items-center justify-between px-4 py-3">
              <button
                type="button"
                onClick={() => onItemClick?.(term)}
                className="typo-body-s text-text-primary text-left"
              >
                {term}
              </button>
              <button
                type="button"
                onClick={() => onItemRemove?.(term)}
                aria-label={`${term} 검색어 삭제`}
                className="text-text-tertiary"
              >
                <Icon name="x" size="sm" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="typo-body-m text-text-tertiary px-4 py-12 text-center">
          최근 검색어가 없어요
        </p>
      )}
    </div>
  );
}
