'use client';

import { useQuery } from '@tanstack/react-query';

import { getPicksByPlace } from '../api/get-picks-by-place';

export function usePicksByPlace(placeId: string) {
  return useQuery({
    queryKey: ['picks', 'by-place', placeId],
    queryFn: () => getPicksByPlace(placeId),
  });
}
