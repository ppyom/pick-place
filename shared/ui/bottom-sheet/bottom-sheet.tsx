'use client';

import { Children, isValidElement, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** 시트 패널(motion.div)에 적용할 className */
  className?: string;
  overlayClassName?: string;
}

function BottomSheet({ isOpen, onClose, children, className, overlayClassName }: Props) {
  const mounted = useIsMounted();

  let title: ReactNode = null;
  let body: ReactNode = null;
  let footer: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === BottomSheet.Title) title = child;
    else if (child.type === BottomSheet.Body) body = child;
    else if (child.type === BottomSheet.Footer) footer = child;
  });

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn('bg-surface-overlay absolute inset-0', overlayClassName)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={cn(
              'container-app bg-surface-elevated absolute inset-x-0 bottom-0',
              'flex max-h-[85vh] flex-col rounded-t-xl shadow-md',
              'pb-[env(safe-area-inset-bottom)]',
              className,
            )}
          >
            <div className="flex shrink-0 justify-center pt-2">
              <span className="bg-border-strong h-1 w-10 rounded-full" />
            </div>

            {title && (
              <div className="flex shrink-0 items-center justify-between px-4 py-3">
                {title}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="닫기"
                  className="text-text-tertiary flex size-6 cursor-pointer items-center justify-center rounded-full"
                >
                  <Icon name="x" size="md" />
                </button>
              </div>
            )}

            {body}

            {footer}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

BottomSheet.Title = function Title({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <h2 className={cn('typo-title-s text-text-primary', className)}>{children}</h2>;
};

BottomSheet.Body = function Body({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('flex-1 overflow-y-auto px-4', className)}>{children}</div>;
};

BottomSheet.Footer = function Footer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('shrink-0 px-4 py-3', className)}>{children}</div>;
};

export { BottomSheet };
