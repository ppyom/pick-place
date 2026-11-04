'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { PickForm, pickToFormValues, useEditPickFormSubmit } from '@/widgets/pick-form';

import { MOCK_CURRENT_USER_ID, type Pick, usePick } from '@/entities/pick';

import { ApiError } from '@/shared/api';
import { AppBar } from '@/shared/ui/app-bar';
import { Button } from '@/shared/ui/button';

interface Props {
  id: string;
}

function EditLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>Pick 수정</AppBar.Title>
      </AppBar>

      {children}
    </div>
  );
}

function EditMessage({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 pt-15">
      <p className="typo-body-s text-text-secondary text-center">{children}</p>
      <Button variant="outline" onClick={() => router.back()}>
        돌아가기
      </Button>
    </div>
  );
}

function PickEditForm({ pick }: { pick: Pick }) {
  const { handleSubmit, isPending } = useEditPickFormSubmit(pick.id);

  return (
    <div className="px-4 pt-15">
      <PickForm
        defaultValues={pickToFormValues(pick)}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}

export function PickEditContent({ id }: Props) {
  const { data: pick, isLoading, isError, error } = usePick(id);

  if (isError) {
    const isNotFound = error instanceof ApiError && error.status === 404;

    return (
      <EditLayout>
        <EditMessage>
          {isNotFound ? '삭제되었거나 존재하지 않는 Pick이에요.' : '잠시 후 다시 시도해주세요.'}
        </EditMessage>
      </EditLayout>
    );
  }

  if (isLoading || !pick) {
    return (
      <EditLayout>
        <p className="typo-body-s text-text-secondary mt-15 py-16 text-center">
          불러오는 중이에요…
        </p>
      </EditLayout>
    );
  }

  // TODO(#77): 백엔드 연동 시 세션 기반 권한 확인으로 교체 (서버가 403을 내려주는 경우 에러 처리)
  if (pick.author.id !== MOCK_CURRENT_USER_ID) {
    return (
      <EditLayout>
        <EditMessage>내가 만든 Pick만 수정할 수 있어요.</EditMessage>
      </EditLayout>
    );
  }

  return (
    <EditLayout>
      <PickEditForm pick={pick} />
    </EditLayout>
  );
}
