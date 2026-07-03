import {
  BookmarkIcon,
  BusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CoffeeIcon,
  DogIcon,
  ForkKnifeIcon,
  HeartIcon,
  HomeIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
  TagsIcon,
  TheaterIcon,
  TreesIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';

export const ICONS = {
  empty: null,

  // UI
  prev: ChevronLeftIcon,
  next: ChevronRightIcon,
  plus: PlusIcon,
  x: XIcon,
  settings: SettingsIcon,
  location: MapPinIcon,
  save: BookmarkIcon,
  share: ShareIcon,
  search: SearchIcon,
  menu: MoreVerticalIcon,
  tags: TagsIcon,
  memo: MessageSquareTextIcon,
  heart: HeartIcon,

  // Bottom Navigation
  home: HomeIcon,
  explore: SearchIcon,
  my: UserIcon,

  // Onboarding - all
  etc: MoreHorizontalIcon,

  // Onboarding - place
  food: ForkKnifeIcon,
  cafe: CoffeeIcon,
  travel: BusIcon,
  nature: TreesIcon,
  culture: TheaterIcon,
  shopping: ShoppingCartIcon,

  // Onboarding - companion
  alone: UserIcon,
  family: HomeIcon,
  couple: HeartIcon,
  friend: UsersIcon,
  pet: DogIcon,
} as const;

export type IconName = keyof typeof ICONS;

export const ICON_SIZES = {
  sm: 16,
  md: 24,
  lg: 28,
} as const;

export type IconSize = keyof typeof ICON_SIZES;
