'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getFeed } from '../api/get-feed';

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['picks', 'feed'],
    queryFn: ({ pageParam }) => getFeed(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
