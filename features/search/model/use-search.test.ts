import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSearch } from './use-search';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe('useSearch', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('검색어로 query 상태를 채우고 결과 페이지로 이동한다', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.executeSearch('성수');
    });

    expect(result.current.query).toBe('성수');
    expect(pushMock).toHaveBeenCalledWith('/search/results?q=%EC%84%B1%EC%88%98');
  });

  it('앞뒤 공백을 trim한다', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.executeSearch('  데이트  ');
    });

    expect(result.current.query).toBe('데이트');
    expect(pushMock).toHaveBeenCalledWith('/search/results?q=%EB%8D%B0%EC%9D%B4%ED%8A%B8');
  });

  it('빈 문자열이면 아무 동작도 하지 않는다', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.executeSearch('   ');
    });

    expect(result.current.query).toBe('');
    expect(pushMock).not.toHaveBeenCalled();
  });
});
