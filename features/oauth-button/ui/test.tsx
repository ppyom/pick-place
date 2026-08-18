import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { OAuthButton } from './oauth-button';

describe('OAuthButton', () => {
  it('provider별 label을 렌더링한다', () => {
    render(<OAuthButton provider="kakao" onClick={vi.fn()} />);

    expect(screen.getByText('카카오로 시작하기')).toBeInTheDocument();
  });

  it('클릭하면 onClick이 호출된다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<OAuthButton provider="naver" onClick={handleClick} />);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서는 onClick이 호출되지 않는다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<OAuthButton provider="google" onClick={handleClick} disabled />);

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled 상태에서는 aria-disabled가 true이다', () => {
    render(<OAuthButton provider="apple" onClick={vi.fn()} disabled />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('disabled가 아닐 때는 aria-disabled가 false이다', () => {
    render(<OAuthButton provider="apple" onClick={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false');
  });
});
