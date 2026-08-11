import { Children, isValidElement, type ReactNode } from 'react';

import { Icon, type IconName } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

function AppBar({ children }: { children: ReactNode }) {
  let back: ReactNode = null;
  let title: ReactNode = null;
  let rightAction: ReactNode = null;
  let search: ReactNode = null;

  const className =
    'container-app fixed inset-x-0 top-0 z-10 bg-surface-elevated border-b flex h-15 items-center px-4 shadow-sm';

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === AppBar.Back) back = child;
    else if (child.type === AppBar.Title) title = child;
    else if (child.type === AppBar.RightAction) rightAction = child;
    else if (child.type === AppBar.Search) search = child;
  });

  if (search) {
    return (
      <header className={cn(className, 'gap-4')}>
        {back}
        {search}
      </header>
    );
  }

  return (
    <header className={cn(className)}>
      <div className="flex min-w-10 items-center">{back}</div>
      {title}
      <div className="ml-auto flex min-w-10 items-center justify-end">{rightAction}</div>
    </header>
  );
}

AppBar.Back = function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="뒤로가기"
      className="text-text-tertiary flex size-6 cursor-pointer items-center justify-center rounded-full"
    >
      <Icon name="prev" size="md" />
    </button>
  );
};

AppBar.Title = function Title({ children }: { children: string }) {
  return (
    <h1 className="typo-label-l text-text-primary pointer-events-none absolute inset-x-14 truncate text-center">
      {children}
    </h1>
  );
};

AppBar.RightAction = function RightAction({
  icon,
  onClick,
  label,
}: {
  icon: IconName;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="text-text-primary flex size-6 cursor-pointer items-center justify-center rounded-full"
    >
      <Icon name={icon} size="sm" />
    </button>
  );
};

AppBar.Search = function Search({ children }: { children: ReactNode }) {
  return <div className="min-w-0 flex-1">{children}</div>;
};

export { AppBar };
