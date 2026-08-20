'use client';

import { useRouter } from 'next/navigation';

import { BottomNavigation } from '@/widgets/bottom-navigation';
import { FeedCard } from '@/widgets/feed-card';

import { useFeed } from '@/entities/pick';

import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { AppBar } from '@/shared/ui/app-bar';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';

export function HomeContent() {
  const router = useRouter();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useFeed();

  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const picks = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="container-app min-h-dvh pb-24">
      <AppBar>
        <AppBar.Search>
          <Input
            leftIcon="search"
            placeholder="장소, 지역, 태그 검색"
            readOnly
            onClick={() => router.push('/search')}
            className="cursor-pointer"
          />
        </AppBar.Search>
      </AppBar>

      <div className="pt-15">
        {isLoading ? (
          <p className="typo-body-s text-text-secondary py-16 text-center">불러오는 중이에요…</p>
        ) : picks.length === 0 ? (
          <p className="typo-body-s text-text-secondary py-16 text-center">
            아직 등록된 Pick이 없어요.
          </p>
        ) : (
          <ul className="space-y-4">
            {picks.map((pick) => (
              <li key={pick.id}>
                <FeedCard pick={pick} />
              </li>
            ))}
          </ul>
        )}

        {hasNextPage && (
          <div ref={loadMoreRef} className="flex justify-center py-6">
            {isFetchingNextPage && (
              <Icon name="loading" size="md" className="text-text-tertiary animate-spin" />
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
