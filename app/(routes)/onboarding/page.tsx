import { Suspense } from 'react';

import { OnboardingContent } from './onboarding-content';

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingContent />
    </Suspense>
  );
}
