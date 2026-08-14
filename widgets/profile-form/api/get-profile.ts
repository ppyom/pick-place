import type { ProfileFormValues } from '../model/schema';

export interface ProfileData extends ProfileFormValues {
  avatarUrl?: string;
}

/**
 * TODO(#56 후속): 백엔드 연동 시 `shared/api` 기반 실제 요청으로 교체
 *
 * 현재는 네트워크 요청 없이 고정된 mock 프로필을 반환합니다.
 */
export async function getProfile(): Promise<ProfileData> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    nickname: '예진',
    bio: '안녕하세요. 이예진입니다.',
    avatarUrl: undefined,
  };
}
