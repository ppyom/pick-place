import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Icon } from '@/shared/ui/icon';

import type { OnboardingStepConfig } from '../model/types';
import { OnboardingStep } from './onboarding-step';

const STEP: OnboardingStepConfig = {
  id: 'interests',
  title: '어떤 장소를 좋아하나요?',
  description: '관심 있는 걸 모두 골라주세요',
  selectionMode: 'multi',
  options: [
    { value: 'food', label: '맛집', icon: <Icon name="food" size="lg" /> },
    { value: 'cafe', label: '카페', icon: <Icon name="cafe" size="lg" /> },
    { value: 'travel', label: '여행', icon: <Icon name="travel" size="lg" /> },
    { value: 'nature', label: '자연', icon: <Icon name="nature" size="lg" /> },
    { value: 'culture', label: '문화', icon: <Icon name="culture" size="lg" /> },
    { value: 'shopping', label: '쇼핑', icon: <Icon name="shopping" size="lg" /> },
    { value: 'etc', label: '기타', icon: <Icon name="etc" size="lg" /> },
  ],
};

describe('OnboardingStep', () => {
  it('title과 description을 렌더한다', () => {
    render(<OnboardingStep step={STEP} selected={[]} onToggle={vi.fn()} />);

    expect(screen.getByRole('heading', { name: STEP.title })).toBeInTheDocument();
    expect(screen.getByText(STEP.description!)).toBeInTheDocument();
  });

  it('config 옵션 개수만큼 chip을 뿌린다', () => {
    render(<OnboardingStep step={STEP} selected={[]} onToggle={vi.fn()} />);

    expect(screen.getAllByRole('button')).toHaveLength(STEP.options.length);
    STEP.options.forEach((opt) => {
      expect(screen.getByRole('button', { name: opt.label })).toBeInTheDocument();
    });
  });

  it('selected 배열에 담긴 옵션만 aria-pressed=true다', () => {
    render(<OnboardingStep step={STEP} selected={['cafe']} onToggle={vi.fn()} />);

    expect(screen.getByRole('button', { name: '맛집' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: '카페' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('chip 클릭 시 해당 value로 onToggle이 불린다', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<OnboardingStep step={STEP} selected={[]} onToggle={onToggle} />);

    await user.click(screen.getByRole('button', { name: '여행' }));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('travel');
  });

  it('chip 묶음이 group으로 스텝 제목과 연결된다', () => {
    render(<OnboardingStep step={STEP} selected={[]} onToggle={vi.fn()} />);

    expect(screen.getByRole('group', { name: STEP.title })).toBeInTheDocument();
  });
});
