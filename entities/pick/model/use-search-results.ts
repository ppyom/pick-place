'use client';

import { useQuery } from '@tanstack/react-query';

import { getSearchResults } from '../api/get-search-results';

export function useSearchResults(query: string) {
  return useQuery({
    queryKey: ['picks', 'search', query],
    queryFn: () => getSearchResults(query),
    enabled: query.trim().length > 0,
  });
}
