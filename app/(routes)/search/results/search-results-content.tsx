'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { PickGridCard } from '@/widgets/pick-grid-card';

import { useSearchResults } from '@/entities/pick';

import { AppBar } from '@/shared/ui/app-bar';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';

export function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data: picks = [], isLoading } = useSearchResults(query);

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Search>
          <Input
            defaultValue={query}
            leftIcon="search"
            placeholder="장소, 지역, 태그 검색"
            readOnly
            onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
            className="cursor-pointer"
          />
        </AppBar.Search>
      </AppBar>

      <div className="pt-15 pb-8">
        {isLoading ? (
          <p className="typo-body-s text-text-secondary py-16 text-center">불러오는 중이에요…</p>
        ) : picks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24">
            <Icon name="empty" size="lg" className="text-text-tertiary" />
            <p className="typo-body-s text-text-secondary text-center">
              &apos;{query}&apos;에 대한 검색 결과가 없어요.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
            {picks.map((pick) => (
              <li key={pick.id}>
                <PickGridCard pick={pick} className="h-full" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
