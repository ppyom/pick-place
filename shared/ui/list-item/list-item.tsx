import Link from 'next/link';

import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { type ListItemVariantProps, listItemVariants } from './constants';

interface Props extends ListItemVariantProps {
  label: string;
  href?: string;
  onClick?: () => void;
  value?: string;
  disabled?: boolean;
  className?: string;
}

export function ListItem({ label, href, onClick, value, disabled, variant, className }: Props) {
  const interactive = Boolean(href ?? onClick);

  const content = (
    <>
      <span className="truncate">{label}</span>
      {interactive ? (
        <Icon name="next" size="sm" className="text-text-tertiary shrink-0" />
      ) : (
        value && <span className="typo-body-s text-text-tertiary shrink-0">{value}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(listItemVariants({ variant, interactive }), className)}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className={cn(listItemVariants({ variant, interactive }), className)}
      >
        {content}
      </button>
    );
  }

  return <div className={cn(listItemVariants({ variant, interactive }), className)}>{content}</div>;
}
