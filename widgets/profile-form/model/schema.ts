import { z } from 'zod';

export const profileFormSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상 입력해주세요.')
    .max(20, '닉네임은 20자 이하로 입력해주세요.'),
  bio: z.string().max(100, '소개는 100자 이하로 입력해주세요.').optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
