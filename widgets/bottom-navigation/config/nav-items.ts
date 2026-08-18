import type { IconName } from '@/shared/ui/icon';

export const NAV_ITEMS: Array<{ href: string; label: string; icon: IconName }> = [
  { href: '/', label: '홈', icon: 'home' },
  { href: '/explore', label: '탐색', icon: 'explore' },
  { href: '/my', label: 'My', icon: 'my' },
];
