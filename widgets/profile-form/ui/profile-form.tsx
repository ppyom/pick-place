'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Field, FieldError } from '@/shared/ui/field';
import { ImageUploader } from '@/shared/ui/image-uploader';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { noop } from '@/shared/utils/noop';

import { profileFormSchema, type ProfileFormValues } from '../model/schema';

interface Props {
  defaultValues?: Partial<ProfileFormValues>;
  avatarSrc?: string;
  onAvatarChange?: (file: File) => void;
  onSubmit: (values: ProfileFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ProfileForm({
  defaultValues,
  avatarSrc,
  onAvatarChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
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
        <ImageUploader
          value={avatarSrc}
          onChange={onAvatarChange ?? noop}
          shape="circle"
          size="lg"
          disabled={isSubmitting}
        />
      </div>

      <Field>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          status={errors.nickname ? 'error' : 'default'}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          {...register('bio')}
        />
        {errors.bio?.message && <FieldError>{errors.bio?.message}</FieldError>}
      </Field>

      <div className="mt-2 flex gap-3">
        {onCancel && (
          <Button
            className="flex-1"
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </Button>
        )}
        <Button className="flex-1" type="submit" isLoading={isSubmitting}>
          저장
        </Button>
      </div>
    </form>
  );
}
