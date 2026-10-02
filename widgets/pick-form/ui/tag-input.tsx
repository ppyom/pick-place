'use client';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tag } from '@/shared/ui/tag';
import { cn } from '@/shared/utils/cn';

import { MAX_TAGS, useTagInput } from '../model/use-tag-input';

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export function TagInput({ value, onChange, className }: Props) {
  const { inputValue, setInputValue, addTag, removeTag, canAdd, isFull } = useTagInput({
    value,
    onChange,
  });

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-2">
        <Input
          className="flex-1"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={isFull ? `최대 ${MAX_TAGS}개까지 추가할 수 있어요` : '태그를 입력해보세요'}
          disabled={isFull}
        />
        <Button type="button" variant="outline" disabled={!canAdd} onClick={addTag}>
          추가
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Tag key={tag} onRemove={() => removeTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
