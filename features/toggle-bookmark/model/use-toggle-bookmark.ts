import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/shared/api';

interface ToggleBookmarkParams {
  pickId: string;
  isBookmarked: boolean;
}

async function toggleBookmark({ pickId, isBookmarked }: ToggleBookmarkParams) {
  return apiClient[isBookmarked ? 'delete' : 'post'](`/picks/${pickId}/bookmark`);
}

export function useToggleBookmark(pickId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isBookmarked: boolean) => toggleBookmark({ pickId, isBookmarked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pick', pickId] });
    },
  });
}
