'use client';

import type { ReactNode } from 'react';
import { type HTMLMotionProps, motion } from 'motion/react';

import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { type ButtonVariantProps, buttonVariants, LOADING_ICON_SIZE } from './constants';

interface Props extends Omit<HTMLMotionProps<'button'>, 'children'>, ButtonVariantProps {
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant,
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading && (
        <Icon name="loading" size={LOADING_ICON_SIZE[size ?? 'md']} className="animate-spin" />
      )}
      {children}
    </motion.button>
  );
}

export type { Props };
