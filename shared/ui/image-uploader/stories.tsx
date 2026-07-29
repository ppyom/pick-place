import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ImageUploader } from './image-uploader';

const meta: Meta<typeof ImageUploader> = {
  title: 'UI/ImageUploader',
  component: ImageUploader,
  tags: [],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

function ImageUploaderRender(args: React.ComponentProps<typeof ImageUploader>) {
  const [, setFile] = useState<File | null>(null);
  return <ImageUploader {...args} onChange={setFile} />;
}

export const Empty: Story = {
  args: {
    shape: 'circle',
    size: 'md',
  },
  render: ImageUploaderRender,
};

export const WithValue: Story = {
  args: {
    shape: 'circle',
    size: 'md',
    value: 'https://github.com/ppyom.png',
  },
  render: ImageUploaderRender,
};

export const Square: Story = {
  args: {
    shape: 'square',
    size: 'lg',
    value: 'https://github.com/ppyom.png',
  },
  render: ImageUploaderRender,
};

export const Disabled: Story = {
  args: {
    shape: 'circle',
    size: 'md',
    value: 'https://github.com/ppyom.png',
    disabled: true,
  },
  render: ImageUploaderRender,
};

function SizesRender(args: React.ComponentProps<typeof ImageUploader>) {
  const [, setFile] = useState<File | null>(null);
  return (
    <div className="flex items-end gap-4">
      <ImageUploader {...args} size="sm" onChange={setFile} />
      <ImageUploader {...args} size="md" onChange={setFile} />
      <ImageUploader {...args} size="lg" onChange={setFile} />
    </div>
  );
}

export const Sizes: Story = {
  render: SizesRender,
};
