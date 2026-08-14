/** 오픈 리다이렉트 방지를 위해 내부 상대 경로만 허용 */
export function toSafeRedirectPath(redirect: string | null, fallback: string): string {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return fallback;
  }

  return redirect;
}
