'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPick } from '../api/create-pick';

export function useCreatePick() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPick,
    onSuccess: () => {
      // 탐색/피드/내 Pick/검색 등 Pick 목록 쿼리(['picks', ...])를 모두 갱신
      queryClient.invalidateQueries({ queryKey: ['picks'] });
    },
  });
}
