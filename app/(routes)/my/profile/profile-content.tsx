'use client';

import { useRouter } from 'next/navigation';

import {
  EDIT_PROFILE_REDIRECT_PATH,
  ProfileForm,
  useProfile,
  useProfileFormSubmit,
} from '@/widgets/profile-form';

import { AppBar } from '@/shared/ui/app-bar';

export function ProfileContent() {
  const router = useRouter();
  const { data, isLoading } = useProfile();
  const { handleAvatarChange, handleSubmit, isPending } = useProfileFormSubmit({
    redirectPath: EDIT_PROFILE_REDIRECT_PATH,
  });

  return (
    <div className="container-app min-h-dvh">
      <AppBar>
        <AppBar.Back onClick={() => router.back()} />
        <AppBar.Title>프로필 수정</AppBar.Title>
      </AppBar>

      <div className="px-6 pt-21 pb-10">
        {isLoading || !data ? (
          <p className="typo-body-s text-text-secondary py-10 text-center">불러오는 중이에요…</p>
        ) : (
          <ProfileForm
            defaultValues={{ nickname: data.nickname, bio: data.bio }}
            avatarSrc={data.avatarUrl}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
            isSubmitting={isPending}
          />
        )}
      </div>
    </div>
  );
}
