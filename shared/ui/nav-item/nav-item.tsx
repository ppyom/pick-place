import Link from 'next/link';

import { Icon, type IconName } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { navItemVariants } from './constants';

interface Props {
  icon: IconName;
  label: string;
  href: string;
  active?: boolean;
  className?: string;
}

export function NavItem({ icon, label, href, active, className }: Props) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(navItemVariants({ active }), className)}
    >
      <Icon name={icon} size="md" />
      <span>{label}</span>
    </Link>
  );
}
