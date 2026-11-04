'use client';

import { useRouter } from 'next/navigation';

import { useUpdatePick } from '@/entities/pick';

import { useToast } from '@/shared/ui/toast';

import { PICK_EDIT_ERROR_MESSAGE, PICK_EDIT_SUCCESS_MESSAGE } from '../config/pick-form';
import type { PickFormValues } from './schema';
import { toCreatePickPayload } from './to-create-pick-payload';

export function useEditPickFormSubmit(pickId: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate, isPending } = useUpdatePick(pickId);

  function handleSubmit(values: PickFormValues) {
    mutate(toCreatePickPayload(values), {
      onSuccess: () => {
        showToast(PICK_EDIT_SUCCESS_MESSAGE);
        router.replace(`/picks/${pickId}`);
      },
      onError: () => {
        showToast(PICK_EDIT_ERROR_MESSAGE);
      },
    });
  }

  return { handleSubmit, isPending };
}
