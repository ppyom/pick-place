'use client';

import { useQuery } from '@tanstack/react-query';

import { getPick } from '../api/get-pick';

export function usePick(id: string) {
  return useQuery({
    queryKey: ['pick', id],
    queryFn: () => getPick(id),
  });
}
