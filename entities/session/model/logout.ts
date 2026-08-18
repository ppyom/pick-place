/**
 * TODO(#57 후속): 백엔드 연동 시 실제 세션 종료 요청(+ auth token 정리)으로 교체
 */
export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}
