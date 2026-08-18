/**
 * TODO(#65 후속): 백엔드 연동 시 실제 회원 탈퇴 요청(+ auth token 정리)으로 교체
 */
export async function deleteAccount(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}
