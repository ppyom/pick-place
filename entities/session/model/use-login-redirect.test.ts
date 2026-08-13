import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLoginRedirect } from './use-login-redirect';

const push = vi.fn();
let searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => searchParams,
}));

describe('useLoginRedirect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams = new URLSearchParams();
  });

  it('최초 유저면 프로필 설정 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useLoginRedirect());

    await act(() => result.current.handleLogin(Promise.resolve({ isFirstTimeUser: true })));

    expect(push).toHaveBeenCalledWith('/profile-setup');
  });

  it('기존 유저면 redirect 쿼리 경로로 이동한다', async () => {
    searchParams = new URLSearchParams({ redirect: '/explore' });
    const { result } = renderHook(() => useLoginRedirect());

    await act(() => result.current.handleLogin(Promise.resolve({ isFirstTimeUser: false })));

    expect(push).toHaveBeenCalledWith('/explore');
  });

  it('redirect 쿼리가 없으면 홈으로 이동한다', async () => {
    const { result } = renderHook(() => useLoginRedirect());

    await act(() => result.current.handleLogin(Promise.resolve({ isFirstTimeUser: false })));

    expect(push).toHaveBeenCalledWith('/');
  });

  it('외부 도메인으로의 redirect는 무시하고 홈으로 이동한다', async () => {
    searchParams = new URLSearchParams({ redirect: '//evil.com' });
    const { result } = renderHook(() => useLoginRedirect());

    await act(() => result.current.handleLogin(Promise.resolve({ isFirstTimeUser: false })));

    expect(push).toHaveBeenCalledWith('/');
  });

  it('로그인 실패 시 에러 메시지를 설정한다', async () => {
    const { result } = renderHook(() => useLoginRedirect());

    await act(() => result.current.handleLogin(Promise.reject(new Error('network error'))));

    await waitFor(() => {
      expect(result.current.error).toBe('로그인에 실패했어요. 다시 시도해주세요.');
    });
    expect(push).not.toHaveBeenCalled();
  });
});
