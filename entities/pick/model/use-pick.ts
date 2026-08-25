'use client';

import { useQuery } from '@tanstack/react-query';

import { ApiError } from '@/shared/api';

import { getPick } from '../api/get-pick';

export function usePick(id: string) {
  return useQuery({
    queryKey: ['pick', id],
    queryFn: () => getPick(id),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status < 500) return false;
      return failureCount < 3;
    },
  });
}
