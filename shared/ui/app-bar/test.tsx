import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppBar } from './app-bar';

describe('AppBar', () => {
  it('AppBar.Back 클릭 시 onClick이 호출된다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <AppBar>
        <AppBar.Back onClick={onClick} />
        <AppBar.Title>타이틀</AppBar.Title>
      </AppBar>,
    );

    await user.click(screen.getByRole('button', { name: '뒤로가기' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('AppBar.RightAction 클릭 시 onClick이 호출된다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <AppBar>
        <AppBar.Title>타이틀</AppBar.Title>
        <AppBar.RightAction icon="settings" onClick={onClick} label="설정" />
      </AppBar>,
    );

    await user.click(screen.getByRole('button', { name: '설정' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('AppBar.Search가 있으면 검색 레이아웃으로 렌더링된다', () => {
    render(
      <AppBar>
        <AppBar.Back onClick={vi.fn()} />
        <AppBar.Search>
          <input placeholder="검색" />
        </AppBar.Search>
      </AppBar>,
    );

    expect(screen.getByRole('button', { name: '뒤로가기' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('검색')).toBeInTheDocument();
  });

  it('title만 있으면 뒤로가기/우측 액션 버튼이 렌더링되지 않는다', () => {
    render(
      <AppBar>
        <AppBar.Title>타이틀</AppBar.Title>
      </AppBar>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
