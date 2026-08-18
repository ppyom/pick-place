'use client';

import { useQuery } from '@tanstack/react-query';

import { getSavedPicks } from '../api/get-saved-picks';

export function useSavedPicks() {
  return useQuery({
    queryKey: ['picks', 'saved'],
    queryFn: getSavedPicks,
  });
}
