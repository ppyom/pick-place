'use client';

import { useRouter } from 'next/navigation';

import { PickForm, type PickFormValues, useCreatePickFormSubmit } from '@/widgets/pick-form';

import { usePlace } from '@/entities/place';

import { AppBar } from '@/shared/ui/app-bar';

interface Props {
  /** 장소 상세에서 진입한 경우 처음부터 담아둘 장소 id */
  placeId?: string;
}

function PickCreateForm({ defaultValues }: { defaultValues?: Partial<PickFormValues> }) {
  const { handleSubmit, isPending } = useCreatePickFormSubmit();

  return (
    <PickForm defaultValues={defaultValues} onSubmit={handleSubmit} isSubmitting={isPending} />
  );
}

function PickCreateFormWithPlace({ placeId }: { placeId: string }) {
  const { data: place, isPending } = usePlace(placeId);

  if (isPending) {
    return <p className="typo-body-s text-text-secondary py-16 text-center">불러오는 중이에요…</p>;
  }

  // 장소를 못 찾아도 빈 폼으로 작성할 수 있게 둡니다.
  return <PickCreateForm defaultValues={place ? { places: [{ place, memo: '' }] } : undefined} />;
}

export function PickCreateContent({ placeId }: Props) {
  const router = useRouter();

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>Pick 만들기</AppBar.Title>
      </AppBar>

      <div className="px-4 pt-15">
        {placeId ? <PickCreateFormWithPlace placeId={placeId} /> : <PickCreateForm />}
      </div>
    </div>
  );
}
