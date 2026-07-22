import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: [],
  args: {
    alt: '귀여운고양이',
    src: 'https://github.com/ppyom.png',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar {...args} size="inline" />
      <Avatar {...args} size="list" />
      <Avatar {...args} size="base" />
      <Avatar {...args} size="card" />
      <Avatar {...args} size="profile" />
    </div>
  ),
};

export const FallbackInitials: Story = {
  args: {
    size: 'profile',
    fallbackText: '귀여운고양이',
    src: '',
  },
};

export const FallbackIcon: Story = {
  args: {
    size: 'profile',
    src: '',
  },
};

export const ImageLoadError: Story = {
  args: {
    size: 'card',
    src: 'https://broken-url.example.com/none.jpg',
  },
};
