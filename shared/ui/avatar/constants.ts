export type AvatarSize = 'inline' | 'list' | 'base' | 'card' | 'profile';

export const SIZE_CLASS: Record<AvatarSize, string> = {
  inline: 'size-4',
  list: 'size-6',
  base: 'size-8',
  card: 'size-16',
  profile: 'size-32',
};

export const ICON_SIZE: Record<AvatarSize, number> = {
  inline: 10,
  list: 14,
  base: 18,
  card: 32,
  profile: 56,
};

export const TEXT_SIZE_CLASS: Partial<Record<AvatarSize, string>> = {
  inline: 'text-[8px]',
  list: 'typo-caption',
  base: 'typo-title-s',
  card: 'typo-title-m',
  profile: 'typo-heading-m',
};

export const INITIALS_LENGTH: Record<AvatarSize, number> = {
  inline: 1,
  list: 1,
  base: 1,
  card: 2,
  profile: 3,
};
