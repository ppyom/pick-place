import { act, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_DURATION, PROVIDER_ERROR_MESSAGE } from './constants';
import { ToastProvider } from './toast-provider';
import { useToast } from './use-toast';

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({
      children,
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      ...props
    }: React.ComponentProps<'div'> & {
      initial?: unknown;
      animate?: unknown;
      exit?: unknown;
      transition?: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

describe('useToast', () => {
  it('ToastProvider 없이 호출하면 에러를 던진다', () => {
    expect(() => renderHook(() => useToast())).toThrow(PROVIDER_ERROR_MESSAGE);
  });
});

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('showToast 호출 시 메시지가 화면에 표시된다', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.showToast('링크가 복사되었습니다');
    });

    expect(screen.getByText('링크가 복사되었습니다')).toBeInTheDocument();
  });

  it('duration이 지나면 토스트가 사라진다', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.showToast('링크가 복사되었습니다');
    });

    expect(screen.getByText('링크가 복사되었습니다')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(DEFAULT_DURATION);
    });

    expect(screen.queryByText('링크가 복사되었습니다')).not.toBeInTheDocument();
  });

  it('여러 번 호출하면 각각 동시에 표시된다', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.showToast('첫 번째');
      result.current.showToast('두 번째');
    });

    expect(screen.getByText('첫 번째')).toBeInTheDocument();
    expect(screen.getByText('두 번째')).toBeInTheDocument();
  });

  it('커스텀 duration을 지정할 수 있다', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.showToast('커스텀 지속시간', 5000);
    });

    act(() => {
      vi.advanceTimersByTime(DEFAULT_DURATION);
    });

    expect(screen.getByText('커스텀 지속시간')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000 - DEFAULT_DURATION);
    });

    expect(screen.queryByText('커스텀 지속시간')).not.toBeInTheDocument();
  });
});
