import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MAX_TAGS, useTagInput } from './use-tag-input';

function setup(initialValue: string[] = []) {
  let value = initialValue;
  const onChange = (next: string[]) => {
    value = next;
  };

  const { result, rerender } = renderHook(
    (props: { value: string[] }) => useTagInput({ value: props.value, onChange }),
    { initialProps: { value } },
  );

  function sync() {
    rerender({ value });
  }

  return { result, sync, getValue: () => value };
}

describe('useTagInput', () => {
  it('입력값을 trim하고 선두 #을 제거해서 추가한다', () => {
    const { result, sync, getValue } = setup();

    act(() => result.current.setInputValue('  #성수  '));
    sync();
    act(() => result.current.addTag());
    sync();

    expect(getValue()).toEqual(['성수']);
    expect(result.current.inputValue).toBe('');
  });

  it('완전히 동일한 태그는 중복 추가되지 않는다', () => {
    const { result, sync, getValue } = setup(['성수']);

    act(() => result.current.setInputValue('성수'));
    sync();

    expect(result.current.canAdd).toBe(false);

    act(() => result.current.addTag());
    sync();

    expect(getValue()).toEqual(['성수']);
  });

  it(`최대 ${MAX_TAGS}개까지만 추가할 수 있다`, () => {
    const initial = Array.from({ length: MAX_TAGS }, (_, i) => `태그${i}`);
    const { result, sync, getValue } = setup(initial);

    expect(result.current.isFull).toBe(true);

    act(() => result.current.setInputValue('새태그'));
    sync();

    expect(result.current.canAdd).toBe(false);

    act(() => result.current.addTag());
    sync();

    expect(getValue()).toHaveLength(MAX_TAGS);
  });

  it('빈 문자열은 추가되지 않는다', () => {
    const { result, sync, getValue } = setup();

    act(() => result.current.setInputValue('   '));
    sync();

    expect(result.current.canAdd).toBe(false);

    act(() => result.current.addTag());
    sync();

    expect(getValue()).toEqual([]);
  });

  it('removeTag로 특정 태그를 제거한다', () => {
    const { result, sync, getValue } = setup(['성수', '데이트']);

    act(() => result.current.removeTag('성수'));
    sync();

    expect(getValue()).toEqual(['데이트']);
  });
});
