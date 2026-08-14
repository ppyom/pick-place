import type { OnboardingSelection } from '../model/types';

/**
 * TODO(#55 후속): 백엔드 연동 시 `shared/api` 기반 실제 요청으로 교체
 *
 * 현재는 네트워크 요청 없이 지연만 흉내내는 mock입니다.
 * 백엔드 스펙(응답/에러 바디) 확정 전까지 이 상태로 둡니다.
 */
export async function submitOnboardingSelection(selection: OnboardingSelection): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.debug('[mock] submitOnboardingSelection', selection);
}
