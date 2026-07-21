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
      <div className="relative">
        {leftIcon && <Icon className={inputIconVariants({ status })} name={leftIcon} size="sm" />}
        <input
          ref={ref}
          className={cn(inputVariants({ status, hasLeftIcon: !!leftIcon }), className)}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
