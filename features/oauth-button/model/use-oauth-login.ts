'use client';

import { useCallback, useState } from 'react';

import { loginWithOAuth, useLoginRedirect } from '@/entities/session';

import type { OAuthProvider } from '../config/providers';

export function useOAuthLogin() {
  const { handleLogin, error } = useLoginRedirect();
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(null);

  const login = useCallback(
    async (provider: OAuthProvider) => {
      setPendingProvider(provider);
      // TODO(#54 후속): 백엔드 연동 시 shared/api 기반 실제 로그인 요청으로 교체
      await handleLogin(loginWithOAuth(provider));
      setPendingProvider(null);
    },
    [handleLogin],
  );

  return { login, pendingProvider, error };
}
