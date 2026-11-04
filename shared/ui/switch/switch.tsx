'use client';

import { cn } from '@/shared/utils/cn';

import { switchThumbVariants, switchVariants } from './constants';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Switch({ checked, onCheckedChange, disabled, className, id }: Props) {
  function handleClick() {
    if (disabled) return;
    onCheckedChange(!checked);
  }

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      className={cn(switchVariants({ checked, disabled }), className)}
    >
      <span className={switchThumbVariants({ checked })} />
    </button>
  );
}
