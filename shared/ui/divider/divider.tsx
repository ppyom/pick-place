import { cn } from '@/shared/utils/cn';

interface Props {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider(props: Props) {
  const { orientation = 'horizontal', className } = props;

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border-default',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
    />
  );
}
