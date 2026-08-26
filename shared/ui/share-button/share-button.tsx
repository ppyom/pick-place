import { useShare } from '@/shared/hooks/use-share';
import { Icon, type IconSize } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

interface Props {
  path: string;
  title: string;
  className?: string;
  size?: IconSize;
}

export function ShareButton({ path, title, className, size = 'sm' }: Props) {
  const { share } = useShare();

  return (
    <button
      type="button"
      aria-label="공유"
      onClick={() => share({ path, title })}
      className={cn('cursor-pointer', className)}
    >
      <Icon name="share" size={size} className="text-text-tertiary" />
    </button>
  );
}
