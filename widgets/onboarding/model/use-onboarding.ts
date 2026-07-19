import { useCallback, useMemo, useState } from 'react';

import { ONBOARDING_STEPS } from '../config/steps';
import type { OnboardingSelection, OnboardingStepId } from './types';

const EMPTY_SELECTION: OnboardingSelection = {
  interests: [],
  companion: [],
  region: [],
};

export function useOnboarding() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState<OnboardingSelection>(EMPTY_SELECTION);

  const currentStep = ONBOARDING_STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === ONBOARDING_STEPS.length - 1;

  const toggleOption = useCallback((stepId: OnboardingStepId, value: string) => {
    const mode = ONBOARDING_STEPS.find((s) => s.id === stepId)?.selectionMode ?? 'multi';

    setSelection((prev) => {
      const current = prev[stepId];
      const next =
        mode === 'single'
          ? current.includes(value)
            ? []
            : [value]
          : current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

      return { ...prev, [stepId]: next };
    });
  }, []);

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, ONBOARDING_STEPS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setStepIndex(0);
    setSelection(EMPTY_SELECTION);
  }, []);

  return useMemo(
    () => ({
      steps: ONBOARDING_STEPS,
      stepIndex,
      currentStep,
      selection,
      isFirst,
      isLast,
      toggleOption,
      goNext,
      goPrev,
      reset,
    }),
    [stepIndex, currentStep, selection, isFirst, isLast, toggleOption, goNext, goPrev, reset],
  );
}
