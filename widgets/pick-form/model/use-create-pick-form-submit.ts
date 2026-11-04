'use client';

import { useRouter } from 'next/navigation';

import { useCreatePick } from '@/entities/pick';

import { useToast } from '@/shared/ui/toast';

import { PICK_CREATE_ERROR_MESSAGE, PICK_CREATE_SUCCESS_MESSAGE } from '../config/pick-form';
import type { PickFormValues } from './schema';
import { toCreatePickPayload } from './to-create-pick-payload';

export function useCreatePickFormSubmit() {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate, isPending } = useCreatePick();

  function handleSubmit(values: PickFormValues) {
    mutate(toCreatePickPayload(values), {
      onSuccess: (pick) => {
        showToast(PICK_CREATE_SUCCESS_MESSAGE);
        // 작성 화면으로 뒤로가기 되지 않도록 replace
        router.replace(`/picks/${pick.id}`);
      },
      onError: () => {
        showToast(PICK_CREATE_ERROR_MESSAGE);
      },
    });
  }

  return { handleSubmit, isPending };
}
