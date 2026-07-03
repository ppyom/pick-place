import { describe, expect, it } from 'vitest';

import { clamp } from './clamp';

describe('clamp', () => {
  it('범위 안의 값은 그대로 반환한다', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('최소값보다 작으면 최소값을 반환한다', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('최대값보다 크면 최대값을 반환한다', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('경계값(min, max)은 그대로 반환한다', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
