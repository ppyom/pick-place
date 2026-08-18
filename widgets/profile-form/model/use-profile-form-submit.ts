'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/shared/ui/toast';

import { saveProfile } from '../api/save-profile';
import { PROFILE_SAVE_ERROR_MESSAGE, PROFILE_SAVE_SUCCESS_MESSAGE } from '../config/profile-form';
import type { ProfileFormValues } from './schema';

interface UseProfileFormSubmitOptions {
  /** 저장 성공 후 이동할 경로. 진입 컨텍스트(최초 설정 vs 수정)에 따라 다르게 전달합니다. */
  redirectPath: string;
}

export function useProfileFormSubmit({ redirectPath }: UseProfileFormSubmitOptions) {
  const router = useRouter();
  const { showToast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      saveProfile({ ...values, avatarFile: avatarFile ?? undefined }),
    onSuccess: () => {
      showToast(PROFILE_SAVE_SUCCESS_MESSAGE);
      router.push(redirectPath);
    },
    onError: () => {
      showToast(PROFILE_SAVE_ERROR_MESSAGE);
    },
  });

  const handleSubmit = useCallback((values: ProfileFormValues) => mutate(values), [mutate]);

  return { handleAvatarChange: setAvatarFile, handleSubmit, isPending };
}
