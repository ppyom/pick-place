'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { searchPlaces } from '../api/search-places';

export function useSearchPlaces(query: string) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ['places', 'search', trimmed],
    queryFn: () => searchPlaces(trimmed),
    placeholderData: keepPreviousData,
  });
}
