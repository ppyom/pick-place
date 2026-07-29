'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Field, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { profileFormSchema, type ProfileFormValues } from '../model/schema';

interface Props {
  defaultValues?: Partial<ProfileFormValues>;
  avatarSrc?: string;
  onAvatarChange?: () => void;
  onSubmit: (values: ProfileFormValues) => void;
  onCancel?: () => void;
}

export function ProfileForm({
  defaultValues,
  avatarSrc,
  onAvatarChange,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nickname: '',
      bio: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <Avatar src={avatarSrc} size="profile" alt="프로필 이미지" />
        <button type="button" onClick={onAvatarChange} className="text-label-m text-text-brand">
          사진 변경
        </button>
      </div>

      <Field>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          status={errors.nickname ? 'error' : 'default'}
          {...register('nickname')}
        />
        {errors.nickname?.message && <FieldError>{errors.nickname?.message}</FieldError>}
      </Field>
      <Field>
        <Label htmlFor="bio">소개</Label>
        <Input
          id="bio"
          placeholder="자기소개를 입력해주세요"
          status={errors.bio ? 'error' : 'default'}
          {...register('bio')}
        />
        {errors.bio?.message && <FieldError>{errors.bio?.message}</FieldError>}
      </Field>

      <div className="mt-2 flex gap-3">
        {onCancel && (
          <Button className="flex-1" type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button className="flex-1" type="submit">
          저장
        </Button>
      </div>
    </form>
  );
}
