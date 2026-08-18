'use client';

import { usePathname } from 'next/navigation';

import { NavItem } from '@/shared/ui/nav-item';
import { cn } from '@/shared/utils/cn';

import { NAV_ITEMS } from '../config/nav-items';

interface Props {
  className?: string;
}

export function BottomNavigation({ className }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'container-app fixed inset-x-0 bottom-0 z-10 flex h-15 items-center justify-between',
        'bg-surface-elevated border-t shadow-sm',
        'pb-[env(safe-area-inset-bottom)]',
        className,
      )}
    >
      {NAV_ITEMS.map(({ href, label, icon }) => (
        <NavItem
          className="flex-1"
          key={href}
          href={href}
          label={label}
          icon={icon}
          active={pathname === href}
        />
      ))}
    </nav>
  );
}
