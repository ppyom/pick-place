import { Thumbnail } from '@/shared/ui/thumbnail/thumbnail';
import { cn } from '@/shared/utils/cn';

import { MAX_VISIBLE_IMAGES } from './constants';

interface Props {
  images: string[];
  alt?: string;
  className?: string;
}

export function CollageThumbnail({ images, alt = '', className }: Props) {
  const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES);
  const remainingCount = images.length - MAX_VISIBLE_IMAGES;
  const count = visibleImages.length;

  return (
    <div
      className={cn(
        'rounded-radius-m grid aspect-square grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden',
        className,
      )}
    >
      {visibleImages.map((src, index) => {
        const isLastVisible = index === visibleImages.length - 1;

        return (
          <div
            key={src + index}
            className={cn(
              'relative',
              count === 1 && 'col-span-2 row-span-2',
              count === 2 && 'row-span-2',
              count === 3 && index === 0 && 'row-span-2',
            )}
          >
            <Thumbnail
              src={src}
              alt={alt ? `${alt} ${index + 1}` : ''}
              className="size-full rounded-none"
              sizes="(max-width: 480px) 50vw, 240px"
            />
            {remainingCount > 0 && isLastVisible && (
              <div className="bg-surface-overlay absolute inset-0 flex items-center justify-center">
                <span className="text-label-l text-text-inverse">+{remainingCount}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
