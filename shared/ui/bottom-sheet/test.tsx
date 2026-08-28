import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BottomSheet } from './bottom-sheet';

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

describe('BottomSheet', () => {
  it('isOpen이 false면 렌더링되지 않는다', () => {
    render(
      <BottomSheet isOpen={false} onClose={vi.fn()}>
        <BottomSheet.Body>내용</BottomSheet.Body>
      </BottomSheet>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('isOpen이 true면 Title/Body/Footer가 렌더링된다', () => {
    render(
      <BottomSheet isOpen onClose={vi.fn()}>
        <BottomSheet.Title>장소 추가</BottomSheet.Title>
        <BottomSheet.Body>내용</BottomSheet.Body>
        <BottomSheet.Footer>
          <button type="button">3개 추가</button>
        </BottomSheet.Footer>
      </BottomSheet>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('장소 추가')).toBeInTheDocument();
    expect(screen.getByText('내용')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3개 추가' })).toBeInTheDocument();
  });

  it('Title이 없으면 헤더(닫기 버튼)가 렌더링되지 않는다', () => {
    render(
      <BottomSheet isOpen onClose={vi.fn()}>
        <BottomSheet.Body>내용</BottomSheet.Body>
      </BottomSheet>,
    );

    expect(screen.queryByRole('button', { name: '닫기' })).not.toBeInTheDocument();
  });

  it('Body/Footer의 className이 각 요소에 적용된다', () => {
    render(
      <BottomSheet isOpen onClose={vi.fn()}>
        <BottomSheet.Body className="custom-body">내용</BottomSheet.Body>
        <BottomSheet.Footer className="custom-footer">
          <button type="button">추가</button>
        </BottomSheet.Footer>
      </BottomSheet>,
    );

    expect(screen.getByText('내용').closest('.custom-body')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '추가' }).closest('.custom-footer'),
    ).toBeInTheDocument();
  });

  it('오버레이 클릭 시 onClose가 호출된다', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <BottomSheet isOpen onClose={onClose}>
        <BottomSheet.Title>장소 추가</BottomSheet.Title>
        <BottomSheet.Body>내용</BottomSheet.Body>
      </BottomSheet>,
    );

    // BottomSheet는 document.body에 포탈로 렌더링된다
    const overlay = document.body.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeNull();
    await user.click(overlay as Element);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <BottomSheet isOpen onClose={onClose}>
        <BottomSheet.Title>장소 추가</BottomSheet.Title>
        <BottomSheet.Body>내용</BottomSheet.Body>
      </BottomSheet>,
    );

    await user.click(screen.getByRole('button', { name: '닫기' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Escape 키 입력 시 onClose가 호출된다', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <BottomSheet isOpen onClose={onClose}>
        <BottomSheet.Title>장소 추가</BottomSheet.Title>
        <BottomSheet.Body>내용</BottomSheet.Body>
      </BottomSheet>,
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
