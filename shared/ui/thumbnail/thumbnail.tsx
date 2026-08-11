import Image from 'next/image';

import { cn } from '@/shared/utils/cn';

import { DEFAULT_THUMBNAIL_SIZES } from './constants';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
}

export function Thumbnail({ src, alt = '', className, sizes = DEFAULT_THUMBNAIL_SIZES }: Props) {
  return (
    <div
      className={cn('rounded-radius-m bg-surface-secondary relative overflow-hidden', className)}
    >
      {src ? <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" /> : null}
    </div>
  );
}
