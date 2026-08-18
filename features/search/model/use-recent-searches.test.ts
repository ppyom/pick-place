import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { __resetRecentSearchesStoreForTests, useRecentSearches } from './use-recent-searches';

describe('useRecentSearches', () => {
  beforeEach(() => {
    window.localStorage.clear();
    __resetRecentSearchesStoreForTests();
  });

  it('검색어를 추가하면 최신순으로 쌓인다', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.addTerm('성수'));
    act(() => result.current.addTerm('데이트'));

    expect(result.current.terms).toEqual(['데이트', '성수']);
  });

  it('같은 검색어를 다시 추가하면 중복 제거하고 맨 앞으로 올린다', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.addTerm('성수'));
    act(() => result.current.addTerm('데이트'));
    act(() => result.current.addTerm('성수'));

    expect(result.current.terms).toEqual(['성수', '데이트']);
  });

  it('최대 10개까지만 유지한다', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      for (let i = 0; i < 11; i += 1) {
        result.current.addTerm(`검색어${i}`);
      }
    });

    expect(result.current.terms).toHaveLength(10);
    expect(result.current.terms[0]).toBe('검색어10');
  });

  it('특정 검색어를 제거한다', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.addTerm('성수'));
    act(() => result.current.addTerm('데이트'));
    act(() => result.current.removeTerm('성수'));

    expect(result.current.terms).toEqual(['데이트']);
  });

  it('전체삭제하면 빈 배열이 된다', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => result.current.addTerm('성수'));
    act(() => result.current.clearAll());

    expect(result.current.terms).toEqual([]);
  });

  it('localStorage에 영속화되어 새 훅 인스턴스에서도 값을 읽는다', () => {
    const { result: first } = renderHook(() => useRecentSearches());
    act(() => first.current.addTerm('서울'));

    const { result: second } = renderHook(() => useRecentSearches());

    expect(second.current.terms).toEqual(['서울']);
  });
});
