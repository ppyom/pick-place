'use client';

import { Onboarding, useOnboardingSubmit } from '@/widgets/onboarding';

export function OnboardingContent() {
  const { handleComplete } = useOnboardingSubmit();

  return <Onboarding onComplete={handleComplete} />;
}
