import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CollageThumbnail } from './collage-thumbnail';

const IMAGES = [
  'https://picsum.photos/seed/collage1/400/400',
  'https://picsum.photos/seed/collage2/400/400',
  'https://picsum.photos/seed/collage3/400/400',
  'https://picsum.photos/seed/collage4/400/400',
  'https://picsum.photos/seed/collage5/400/400',
];

const meta: Meta<typeof CollageThumbnail> = {
  title: 'UI/CollageThumbnail',
  component: CollageThumbnail,
  tags: ['!dev'],
  args: {
    alt: '장소 콜라주',
    className: 'size-40',
  },
};

export default meta;

type Story = StoryObj<typeof CollageThumbnail>;

export const OneImage: Story = {
  args: {
    images: IMAGES.slice(0, 1),
  },
};

export const TwoImages: Story = {
  args: {
    images: IMAGES.slice(0, 2),
  },
};

export const ThreeImages: Story = {
  args: {
    images: IMAGES.slice(0, 3),
  },
};

export const FourImages: Story = {
  args: {
    images: IMAGES.slice(0, 4),
  },
};

export const OverflowWithBadge: Story = {
  args: {
    images: IMAGES,
  },
};
