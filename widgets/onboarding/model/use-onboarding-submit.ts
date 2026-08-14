'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { toSafeRedirectPath } from '@/shared/utils/redirect';

import { submitOnboardingSelection } from '../api/submit-onboarding-selection';
import { DEFAULT_ONBOARDING_REDIRECT_PATH } from '../config/onboarding';
import type { OnboardingSelection } from './types';

export function useOnboardingSubmit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate, isPending } = useMutation({
    mutationFn: submitOnboardingSelection,
    onSuccess: () => {
      const redirectPath = toSafeRedirectPath(
        searchParams.get('redirect'),
        DEFAULT_ONBOARDING_REDIRECT_PATH,
      );
      router.push(redirectPath);
    },
  });

  const handleComplete = useCallback(
    (selection: OnboardingSelection) => mutate(selection),
    [mutate],
  );

  return { handleComplete, isPending };
}
