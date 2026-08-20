'use client';

import { useQuery } from '@tanstack/react-query';

import { getExplorePicks } from '../api/get-explore-picks';

export function useExplorePicks(categoryId: string) {
  return useQuery({
    queryKey: ['picks', 'explore', categoryId],
    queryFn: () => getExplorePicks(categoryId),
  });
}
