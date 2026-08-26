'use client';

import { useQuery } from '@tanstack/react-query';

import { ApiError } from '@/shared/api';

import { getPlace } from '../api/get-place';

export function usePlace(id: string) {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => getPlace(id),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status < 500) return false;
      return failureCount < 3;
    },
  });
}
