'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  DEFAULT_REDIRECT_PATH,
  FIRST_TIME_USER_REDIRECT_PATH,
  LOGIN_ERROR_MESSAGE,
} from '../config/login';
import type { LoginResult } from './types';

/** 오픈 리다이렉트 방지를 위해 내부 상대 경로만 허용 */
function toSafeRedirectPath(redirect: string | null): string {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return DEFAULT_REDIRECT_PATH;
  }

  return redirect;
}

/**
 * 로그인 수단(OAuth/로컬)과 무관하게 로그인 결과를 받아
 * 최초 유저 분기 + 리다이렉트 + 에러 상태를 처리합니다.
 */
export function useLoginRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (login: Promise<LoginResult>) => {
      setError(null);

      try {
        const { isFirstTimeUser } = await login;

        if (isFirstTimeUser) {
          router.push(FIRST_TIME_USER_REDIRECT_PATH);
          return;
        }

        router.push(toSafeRedirectPath(searchParams.get('redirect')));
      } catch {
        setError(LOGIN_ERROR_MESSAGE);
      }
    },
    [router, searchParams],
  );

  return { handleLogin, error };
}
