import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/shared/api';

import { useToggleBookmark } from './use-toggle-bookmark';

vi.mock('@/shared/api', () => ({
  apiClient: {
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  };
}

describe('useToggleBookmark', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiClient.post).mockResolvedValue(undefined);
    vi.mocked(apiClient.delete).mockResolvedValue(undefined);
  });

  it('isBookmarked가 false면 post를 호출한다', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useToggleBookmark('pick-1'), { wrapper });

    result.current.mutate(false);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiClient.post).toHaveBeenCalledWith('/picks/pick-1/bookmark');
    expect(apiClient.delete).not.toHaveBeenCalled();
  });

  it('isBookmarked가 true면 delete를 호출한다', async () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useToggleBookmark('pick-1'), { wrapper });

    result.current.mutate(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiClient.delete).toHaveBeenCalledWith('/picks/pick-1/bookmark');
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('성공하면 해당 pick 쿼리를 invalidate한다', async () => {
    const { wrapper, queryClient } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(() => useToggleBookmark('pick-1'), { wrapper });

    result.current.mutate(false);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['pick', 'pick-1'] });
  });
});
