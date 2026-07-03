import { describe, expect, it } from 'vitest';

import { assert } from './assert';

describe('assert', () => {
  it('조건이 참이면 에러를 던지지 않는다', () => {
    expect(() => assert(true)).not.toThrow();
  });

  it('조건이 거짓이면 기본 메시지로 에러를 던진다', () => {
    expect(() => assert(false)).toThrow('Assertion failed');
  });

  it('조건이 거짓이면 지정한 메시지로 에러를 던진다', () => {
    expect(() => assert(false, '커스텀 에러 메시지')).toThrow('커스텀 에러 메시지');
  });

  it('falsy 값(0, "", null, undefined)에서도 에러를 던진다', () => {
    expect(() => assert(0)).toThrow();
    expect(() => assert('')).toThrow();
    expect(() => assert(null)).toThrow();
    expect(() => assert(undefined)).toThrow();
  });
});
