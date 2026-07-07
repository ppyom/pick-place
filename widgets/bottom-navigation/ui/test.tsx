import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BottomNavigation } from './bottom-navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('BottomNavigation', () => {
  it('홈/탐색/마이페이지 3개 탭을 모두 렌더링한다', async () => {
    const { usePathname } = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/');

    render(<BottomNavigation />);

    expect(screen.getByRole('link', { name: /홈/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /탐색/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /My/ })).toBeInTheDocument();
  });

  it('현재 경로와 일치하는 탭만 active 처리한다', async () => {
    const { usePathname } = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/explore');

    render(<BottomNavigation />);

    expect(screen.getByRole('link', { name: /탐색/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /홈/ })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: /My/ })).not.toHaveAttribute('aria-current');
  });

  it('각 탭이 올바른 href를 갖는다', async () => {
    const { usePathname } = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/');

    render(<BottomNavigation />);

    expect(screen.getByRole('link', { name: /홈/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /탐색/ })).toHaveAttribute('href', '/explore');
    expect(screen.getByRole('link', { name: /My/ })).toHaveAttribute('href', '/my');
  });
});
