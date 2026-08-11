'use client';

import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import type { OnboardingSelection } from '../model/types';
import { useOnboarding } from '../model/use-onboarding';
import { OnboardingStep } from './onboarding-step';

interface Props {
  onComplete?: (selection: OnboardingSelection) => void;
  className?: string;
}

export function Onboarding({ onComplete, className }: Props) {
  const {
    steps,
    stepIndex,
    currentStep,
    selection,
    isFirst,
    isLast,
    toggleOption,
    goNext,
    goPrev,
  } = useOnboarding();

  const handleNext = () => {
    if (isLast) {
      onComplete?.(selection);
      return;
    }
    goNext();
  };

  return (
    <div className={cn('container-app flex min-h-dvh flex-col px-4 pt-6 pb-8', className)}>
      <div
        className="flex items-center gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={stepIndex + 1}
        aria-label={`온보딩 진행 ${stepIndex + 1}/${steps.length}`}
      >
        {steps.map((step, i) => (
          <span
            key={step.id}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i <= stepIndex ? 'bg-surface-brand' : 'bg-surface-secondary',
            )}
          />
        ))}
      </div>

      <div className="relative flex-1 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <OnboardingStep
              step={currentStep}
              selected={selection[currentStep.id]}
              onToggle={(value) => toggleOption(currentStep.id, value)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 pt-6">
          {!isFirst && (
            <Button variant="secondary" onClick={goPrev} className="flex-1">
              이전
            </Button>
          )}
          <Button onClick={handleNext} className="flex-4">
            {isLast ? '시작하기' : '다음'}
          </Button>
        </div>
        <Button variant="text" onClick={handleNext}>
          건너뛰기
        </Button>
      </div>
    </div>
  );
}
