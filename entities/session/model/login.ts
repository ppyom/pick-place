import type { LoginResult, OAuthProvider } from './types';

/**
 * TODO(#54 후속): 백엔드 연동 시 `shared/api` 기반 실제 OAuth 로그인 요청으로 교체
 *
 * 현재는 kakao로 로그인하면 최초 유저, 그 외는 기존 유저로 취급합니다.
 * 온보딩/기존 유저 분기 흐름을 테스트할 때 이 조건을 바꿔가며 확인하세요.
 */
export async function loginWithOAuth(provider: OAuthProvider): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { isFirstTimeUser: provider === 'kakao' };
}
