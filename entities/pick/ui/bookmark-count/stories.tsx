import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BookmarkCount } from './bookmark-count';

const meta = {
  title: 'Entities/Pick/BookmarkCount',
  component: BookmarkCount,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['plane', 'filled', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    active: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof BookmarkCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: {
    count: 128,
    variant: 'plain',
    size: 'sm',
  },
};

export const Filled: Story = {
  args: {
    count: 128,
    variant: 'filled',
    size: 'sm',
  },
};

export const Outline: Story = {
  args: {
    count: 128,
    variant: 'outline',
    size: 'sm',
  },
};

export const Active: Story = {
  args: {
    count: 129,
    variant: 'plain',
    size: 'sm',
    active: true,
  },
};

export const SizeMedium: Story = {
  args: {
    count: 128,
    variant: 'filled',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    count: 128,
    variant: 'filled',
    size: 'lg',
  },
};

export const ManyBookmarks: Story = {
  args: {
    count: 12500,
    variant: 'plain',
    size: 'sm',
  },
};
