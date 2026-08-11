import { useMutation, useQueryClient } from '@tanstack/react-query';

import { env } from '@/shared/config/env';

interface ToggleBookmarkParams {
  pickId: string;
  isBookmarked: boolean;
}

async function toggleBookmark({ pickId, isBookmarked }: ToggleBookmarkParams) {
  const res = await fetch(`${env.API_URL}/picks/${pickId}/bookmark`, {
    method: isBookmarked ? 'DELETE' : 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to toggle bookmark');
  }

  return res.json();
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
