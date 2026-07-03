import type { LucideProps } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

import { ICON_SIZES, type IconName, ICONS, type IconSize } from './contants';

interface Props extends Omit<LucideProps, 'ref'> {
  name: IconName;
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 'md', strokeWidth = 2, className, ...props }: Props) {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    return (
      <div
        style={{ width: ICON_SIZES[size], height: ICON_SIZES[size] }}
        className={cn(className)}
      />
    );
  }

  return (
    <IconComponent
      className={cn(className)}
      size={ICON_SIZES[size]}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
