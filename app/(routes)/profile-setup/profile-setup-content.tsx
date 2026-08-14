'use client';

import {
  FIRST_TIME_PROFILE_REDIRECT_PATH,
  ProfileForm,
  useProfileFormSubmit,
} from '@/widgets/profile-form';

export function ProfileSetupContent() {
  const { handleAvatarChange, handleSubmit, isPending } = useProfileFormSubmit({
    redirectPath: FIRST_TIME_PROFILE_REDIRECT_PATH,
  });

  return (
    <div className="container-app min-h-dvh px-6 py-10">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="typo-title-l text-text-primary">프로필을 설정해주세요</h1>
        <p className="typo-body-s text-text-secondary">
          닉네임과 소개는 나중에 언제든 수정할 수 있어요
        </p>
      </div>
      <ProfileForm
        onAvatarChange={handleAvatarChange}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
