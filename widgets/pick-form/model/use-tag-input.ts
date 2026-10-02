'use client';

import { useState } from 'react';

export const MAX_TAGS = 5;

interface Params {
  value: string[];
  onChange: (tags: string[]) => void;
}

/**
 * Pick 작성 페이지의 태그 입력 로직. `#` prefix는 렌더링(`Tag`)에서만 붙이고,
 * 여기서 다루는 값은 항상 prefix 없는 순수 문자열입니다.
 */
export function useTagInput({ value, onChange }: Params) {
  const [inputValue, setInputValue] = useState('');

  const isFull = value.length >= MAX_TAGS;
  const trimmed = inputValue.trim().replace(/^#+/, '');
  const canAdd = !isFull && trimmed.length > 0 && !value.includes(trimmed);

  function addTag() {
    if (!canAdd) return;

    onChange([...value, trimmed]);
    setInputValue('');
  }

  function removeTag(tag: string) {
    onChange(value.filter((item) => item !== tag));
  }

  return { inputValue, setInputValue, addTag, removeTag, canAdd, isFull, maxTags: MAX_TAGS };
}
