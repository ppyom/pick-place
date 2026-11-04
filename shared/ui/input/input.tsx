import { forwardRef, type InputHTMLAttributes } from 'react';

import { Icon, type IconName } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { inputIconVariants, type InputVariantProps, inputVariants } from './constants';

interface Props extends InputHTMLAttributes<HTMLInputElement>, Pick<InputVariantProps, 'status'> {
  leftIcon?: IconName;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, leftIcon, status, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        {leftIcon && <Icon className={inputIconVariants({ status })} name={leftIcon} size="sm" />}
        <input
          ref={ref}
          aria-invalid={status === 'error' || undefined}
          className={inputVariants({ status, hasLeftIcon: !!leftIcon })}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
