import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { ICONS } from '@/shared/ui/icon';

import { INPUT_STATUSES } from './constants';
import { Input } from './input';

const iconNames = Object.keys(ICONS) as Array<keyof typeof ICONS>;

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['!dev'],
  argTypes: {
    status: { control: 'inline-radio', options: INPUT_STATUSES },
    leftIcon: { control: 'select', options: [undefined, ...iconNames] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    className: { control: false },
  },
  args: {
    placeholder: '장소를 검색해보세요',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLeftIcon: Story = {
  args: { leftIcon: 'search' },
};

export const Error: Story = {
  args: { status: 'error', defaultValue: '이미 사용 중인 이름이에요' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '수정할 수 없어요' },
};

// 상태 한눈에 보기
export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-3">
      <Input {...args} status="default" placeholder="default" />
      <Input {...args} status="default" leftIcon="search" placeholder="with icon" />
      <Input {...args} status="error" defaultValue="error 상태" />
      <Input {...args} disabled defaultValue="disabled 상태" />
    </div>
  ),
};

// 입력 값 변경 동작 검증
export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.type(input, '성수동 카페');

    await expect(input).toHaveValue('성수동 카페');
  },
};

// disabled 시 입력 차단 검증
export const DisabledBlocksInput: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.type(input, '입력 시도');

    await expect(input).toBeDisabled();
    await expect(input).toHaveValue('');
  },
};
