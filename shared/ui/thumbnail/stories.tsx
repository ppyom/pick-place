import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Thumbnail } from './thumbnail';

const meta: Meta<typeof Thumbnail> = {
  title: 'UI/Thumbnail',
  component: Thumbnail,
  args: {
    src: 'https://picsum.photos/seed/thumb1/400/400',
    alt: '장소 썸네일',
  },
};

export default meta;

type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {
  args: {
    className: 'size-40',
  },
};

export const Empty: Story = {
  args: {
    src: undefined,
    className: 'size-40',
  },
};
