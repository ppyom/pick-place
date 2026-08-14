import { describe, expect, it } from 'vitest';

import { toSafeRedirectPath } from './redirect';

describe('toSafeRedirectPath', () => {
  it('내부 상대 경로면 그대로 반환한다', () => {
    expect(toSafeRedirectPath('/my/settings', '/')).toBe('/my/settings');
  });

  it('redirect가 없으면 fallback을 반환한다', () => {
    expect(toSafeRedirectPath(null, '/explore')).toBe('/explore');
  });

  it('//로 시작하는 프로토콜 상대 경로는 fallback으로 대체한다', () => {
    expect(toSafeRedirectPath('//evil.com', '/')).toBe('/');
  });

  it('/로 시작하지 않는 경로는 fallback으로 대체한다', () => {
    expect(toSafeRedirectPath('evil.com', '/')).toBe('/');
  });
});
