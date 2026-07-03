import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('여러 클래스를 하나의 문자열로 합친다', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('falsy 값(undefined, null, false)은 무시한다', () => {
    expect(cn('flex', undefined, null, false, 'gap-2')).toBe('flex gap-2');
  });

  it('충돌하는 Tailwind 클래스는 뒤에 오는 값으로 덮어쓴다', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
