import { cn } from '@/shared/utils/cn';

import type { OnboardingStepConfig } from '../model/types';
import { OnboardingChip } from './onboarding-chip';

interface Props {
  step: OnboardingStepConfig;
  selected: string[];
  onToggle: (value: string) => void;
  className?: string;
}

export function OnboardingStep({ step, selected, onToggle, className }: Props) {
  return (
    <section
      className={cn('flex flex-col gap-6', className)}
      aria-labelledby={`onboarding-step-${step.id}`}
    >
      <header className="flex flex-col gap-2">
        <h2 id={`onboarding-step-${step.id}`} className="typo-heading-m text-text-primary">
          {step.title}
        </h2>
        {step.description && <p className="typo-body-m text-text-secondary">{step.description}</p>}
      </header>

      <div
        role="group"
        aria-labelledby={`onboarding-step-${step.id}`}
        className={cn('grid gap-2', step.id === 'region' ? 'grid-cols-3' : 'grid-cols-2')}
      >
        {step.options.map((option) => (
          <OnboardingChip
            key={option.value}
            icon={option.icon}
            selected={selected.includes(option.value)}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </OnboardingChip>
        ))}
      </div>
    </section>
  );
}
