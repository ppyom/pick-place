import { Icon, type IconSize } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { useSharePick } from '../model/use-share-pick';

interface Props {
  pickId: string;
  title: string;
  className?: string;
  size?: IconSize;
}

export function ShareButton({ pickId, title, className, size = 'sm' }: Props) {
  const { share } = useSharePick();

  return (
    <button
      type="button"
      aria-label="공유"
      onClick={() => share({ pickId, title })}
      className={cn('cursor-pointer', className)}
    >
      <Icon name="share" size={size} className="text-text-tertiary" />
    </button>
  );
}
