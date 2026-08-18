'use client';

import { useQuery } from '@tanstack/react-query';

import { getMyPicks } from '../api/get-my-picks';

export function useMyPicks() {
  return useQuery({
    queryKey: ['picks', 'mine'],
    queryFn: getMyPicks,
  });
}
