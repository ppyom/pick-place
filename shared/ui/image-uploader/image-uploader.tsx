'use client';

import { useEffect, useRef, useState } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { Icon } from '@/shared/ui/icon';
import { cn } from '@/shared/utils/cn';

import { ICON_SIZES, imageUploaderVariants } from './constants';

export interface Props extends VariantProps<typeof imageUploaderVariants> {
  onChange: (file: File) => void;
  value?: string;
  placeholder?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  shape,
  size,
  disabled = false,
  placeholder,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  const openFilePicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const nextUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextUrl;
    setPreviewUrl(nextUrl);
    onChange(file);
  };

  if (value !== prevValue) {
    setPrevValue(value);
    setPreviewUrl(value);
  }

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(imageUploaderVariants({ shape, size, disabled }), className)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="이미지 선택"
      onClick={openFilePicker}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openFilePicker();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={disabled}
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <img className="size-full object-cover" src={previewUrl} alt="" />
      ) : (
        (placeholder ?? (
          <Icon name="camera" size={ICON_SIZES[size ?? 'md']} className="text-text-tertiary" />
        ))
      )}
    </div>
  );
}
