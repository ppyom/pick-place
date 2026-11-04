'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePick, type UpdatePickPayload } from '../api/update-pick';

export function useUpdatePick(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePickPayload) => updatePick(id, payload),
    onSuccess: () => {
      // 상세와 Pick 목록 쿼리(['picks', ...])를 모두 갱신
      queryClient.invalidateQueries({ queryKey: ['pick', id] });
      queryClient.invalidateQueries({ queryKey: ['picks'] });
    },
  });
}
