'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { RecentSearchList } from '@/widgets/recent-search-list';

import { useRecentSearches, useSearch } from '@/features/search';

import { AppBar } from '@/shared/ui/app-bar';
import { Input } from '@/shared/ui/input';

export function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const { query, setQuery, executeSearch } = useSearch(initialQuery);
  const { terms, addTerm, removeTerm, clearAll } = useRecentSearches();

  const handleSearch = (term: string) => {
    addTerm(term);
    executeSearch(term);
  };

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Search>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch(query)}
            leftIcon="search"
            placeholder="장소, 지역, 태그 검색"
            autoFocus
          />
        </AppBar.Search>
      </AppBar>

      <div className="pt-15 pb-8">
        <RecentSearchList
          items={terms}
          onItemClick={handleSearch}
          onItemRemove={removeTerm}
          onClearAll={clearAll}
        />
      </div>
    </div>
  );
}
