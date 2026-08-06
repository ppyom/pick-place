import { cn } from '@/shared/utils/cn';

type Props = {
  children: string;
  className?: string;
};

export function Tag({ children, className }: Props) {
  return (
    <span
      className={cn(
        'typo-caption text-text-primary bg-surface-brand-subtle rounded-full px-2 py-1',
        className,
      )}
    >
      #{children}
    </span>
  );
}
