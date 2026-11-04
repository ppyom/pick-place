import { z } from 'zod';

import type { Place } from '@/entities/place';

import {
  PICK_DESCRIPTION_MAX_LENGTH,
  PICK_TITLE_MAX_LENGTH,
  PLACE_MEMO_MAX_LENGTH,
} from '../config/pick-form';
import { MAX_TAGS } from './use-tag-input';

export const pickFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '제목을 입력해주세요.')
    .max(PICK_TITLE_MAX_LENGTH, `제목은 ${PICK_TITLE_MAX_LENGTH}자 이하로 입력해주세요.`),
  description: z
    .string()
    .max(
      PICK_DESCRIPTION_MAX_LENGTH,
      `설명은 ${PICK_DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`,
    ),
  tags: z.array(z.string()).max(MAX_TAGS),
  isPublic: z.boolean(),
  places: z
    .array(
      z.object({
        place: z.custom<Place>(),
        memo: z
          .string()
          .max(PLACE_MEMO_MAX_LENGTH, `메모는 ${PLACE_MEMO_MAX_LENGTH}자 이하로 입력해주세요.`),
      }),
    )
    .min(1, '장소를 1개 이상 추가해주세요.'),
});

export type PickFormValues = z.infer<typeof pickFormSchema>;
