import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/shared/ui/input';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['!dev'],
  argTypes: {
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: 'nickname',
    children: '닉네임',
    required: false,
  },
};

export const Required: Story = {
  args: {
    htmlFor: 'password',
    children: '비밀번호',
    required: true,
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <Label {...args} />
      <Input id={args.htmlFor} placeholder="입력해주세요" />
    </div>
  ),
  args: {
    htmlFor: 'email',
    children: '이메일',
    required: true,
  },
};
