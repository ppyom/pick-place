'use client';

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PlaceItem } from '@/entities/pick';

import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldError } from '@/shared/ui/field';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';

import {
  PICK_DESCRIPTION_MAX_LENGTH,
  PICK_TITLE_MAX_LENGTH,
  PLACE_MEMO_MAX_LENGTH,
} from '../../config/pick-form';
import { pickFormSchema, type PickFormValues } from '../../model/schema';
import { PlaceAddSheet } from '../place-add-sheet/place-add-sheet';
import { TagInput } from '../tag-input';

interface Props {
  defaultValues?: Partial<PickFormValues>;
  onSubmit: (values: PickFormValues) => void;
  isSubmitting?: boolean;
}

export function PickForm({ defaultValues, onSubmit, isSubmitting = false }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<PickFormValues>({
    resolver: zodResolver(pickFormSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      isPublic: true,
      places: [],
      ...defaultValues,
    },
  });

  const places = useWatch({ control, name: 'places' });

  function setPlaces(next: PickFormValues['places']) {
    setValue('places', next, { shouldDirty: true, shouldValidate: isSubmitted });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Field>
          <Label htmlFor="title" required>
            제목
          </Label>
          <Input
            id="title"
            placeholder="Pick 이름을 입력해주세요"
            maxLength={PICK_TITLE_MAX_LENGTH}
            status={errors.title ? 'error' : 'default'}
            disabled={isSubmitting}
            {...register('title')}
          />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <Field>
          <Label htmlFor="description">설명</Label>
          <Textarea
            id="description"
            rows={6}
            placeholder="어떤 장소들을 모았나요?"
            maxLength={PICK_DESCRIPTION_MAX_LENGTH}
            status={errors.description ? 'error' : 'default'}
            disabled={isSubmitting}
            {...register('description')}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>

        <Field aria-labelledby="pick-tags-label">
          <span id="pick-tags-label" className="typo-label-m text-text-primary">
            태그
          </span>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => <TagInput value={field.value} onChange={field.onChange} />}
          />
        </Field>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="isPublic">공개 여부</Label>
            <FieldDescription>공개로 설정하면 다른 사람들에게 보여질 수 있어요!</FieldDescription>
          </div>
          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <Switch
                id="isPublic"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </div>

        <Field aria-labelledby="pick-places-label">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span id="pick-places-label" className="typo-label-m text-text-primary">
                장소
              </span>
              <FieldDescription>장소를 추가하고 메모를 입력해보세요!</FieldDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={() => setIsSheetOpen(true)}
            >
              <Icon name="plus" size="sm" />
              장소 추가
            </Button>
          </div>

          {places.length > 0 && (
            <ul className="flex flex-col">
              {places.map((item, index) => (
                <li key={item.place.id}>
                  <PlaceItem
                    className="px-0"
                    place={item.place}
                    memo={item.memo}
                    onMemoChange={(memo) =>
                      setPlaces(
                        places.map((current, i) =>
                          i === index
                            ? { ...current, memo: memo.slice(0, PLACE_MEMO_MAX_LENGTH) }
                            : current,
                        ),
                      )
                    }
                    onRemove={() => setPlaces(places.filter((_, i) => i !== index))}
                  />
                </li>
              ))}
            </ul>
          )}
          <FieldError>{errors.places?.message}</FieldError>
        </Field>

        <div className="bg-surface-background sticky bottom-0 -mx-4 px-4 pt-3 pb-6">
          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            저장
          </Button>
        </div>
      </form>

      <PlaceAddSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        addedPlaceIds={places.map((item) => item.place.id)}
        onConfirm={({ added, removedIds }) =>
          setPlaces([
            ...places.filter((item) => !removedIds.includes(item.place.id)),
            ...added.map((place) => ({ place, memo: '' })),
          ])
        }
      />
    </>
  );
}
