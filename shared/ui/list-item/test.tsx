import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ListItem } from './list-item';

describe('ListItem', () => {
  it('href가 있으면 link로 렌더링된다', () => {
    render(<ListItem label="프로필 편집" href="/my/profile" />);

    const link = screen.getByRole('link', { name: '프로필 편집' });
    expect(link).toHaveAttribute('href', '/my/profile');
  });

  it('onClick만 있으면 button으로 렌더링되고 클릭 시 호출된다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ListItem label="로그아웃" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: '로그아웃' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled면 클릭해도 onClick이 호출되지 않는다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ListItem label="로그아웃 중…" onClick={onClick} disabled />);

    const button = screen.getByRole('button', { name: '로그아웃 중…' });
    expect(button).toHaveAttribute('aria-disabled', 'true');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('href/onClick이 모두 없으면 정적 행으로 렌더링되고 value를 표시한다', () => {
    render(<ListItem label="버전" value="0.1.0" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('버전')).toBeInTheDocument();
    expect(screen.getByText('0.1.0')).toBeInTheDocument();
  });
});
