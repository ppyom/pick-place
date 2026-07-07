import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavItem } from './nav-item';

describe('NavItem', () => {
  it('label과 href를 렌더링한다', () => {
    render(<NavItem icon="home" label="홈" href="/" />);

    const link = screen.getByRole('link', { name: /홈/ });
    expect(link).toHaveAttribute('href', '/');
  });

  it('active일 때 aria-current="page"를 갖는다', () => {
    render(<NavItem icon="home" label="홈" href="/" active />);

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('inactive일 때 aria-current를 갖지 않는다', () => {
    render(<NavItem icon="home" label="홈" href="/" active={false} />);

    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });
});
