import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loginWithOAuth } from '@/entities/session';

import { useOAuthLogin } from './use-oauth-login';

const handleLogin = vi.fn();

vi.mock('@/entities/session', () => ({
  loginWithOAuth: vi.fn(),
  useLoginRedirect: () => ({ handleLogin, error: null }),
}));

describe('useOAuthLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    handleLogin.mockResolvedValue(undefined);
    vi.mocked(loginWithOAuth).mockResolvedValue({ isFirstTimeUser: false });
  });

  it('로그인 진행 중엔 눌린 provider를 pendingProvider로 노출하고, 끝나면 초기화한다', async () => {
    let resolveHandleLogin: () => void = () => {};
    handleLogin.mockImplementation(
      () => new Promise<void>((resolve) => (resolveHandleLogin = resolve)),
    );
    const { result } = renderHook(() => useOAuthLogin());

    act(() => {
      result.current.login('kakao');
    });

    await waitFor(() => expect(result.current.pendingProvider).toBe('kakao'));

    await act(async () => {
      resolveHandleLogin();
    });

    await waitFor(() => expect(result.current.pendingProvider).toBeNull());
  });

  it('선택한 provider로 로그인 요청 결과를 handleLogin에 위임한다', async () => {
    const { result } = renderHook(() => useOAuthLogin());

    await act(() => result.current.login('google'));

    expect(loginWithOAuth).toHaveBeenCalledWith('google');
    expect(handleLogin).toHaveBeenCalledWith(expect.any(Promise));
  });
});
