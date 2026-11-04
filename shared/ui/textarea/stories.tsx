import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { TEXTAREA_STATUSES } from './constants';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['!dev'],
  argTypes: {
    status: { control: 'inline-radio', options: TEXTAREA_STATUSES },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    className: { control: false },
  },
  args: {
    placeholder: '장소에 대한 설명을 적어주세요',
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { status: 'error', defaultValue: '10자 이상 입력해주세요' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '수정할 수 없어요' },
};

// 상태 한눈에 보기
export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-3">
      <Textarea {...args} status="default" placeholder="default" />
      <Textarea {...args} status="error" defaultValue="error 상태" />
      <Textarea {...args} disabled defaultValue="disabled 상태" />
    </div>
  ),
};

// 입력 값 변경 동작 검증
export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await userEvent.type(textarea, '한강이 보이는 조용한 카페예요');

    await expect(textarea).toHaveValue('한강이 보이는 조용한 카페예요');
  },
};

// disabled 시 입력 차단 검증
export const DisabledBlocksInput: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await userEvent.type(textarea, '입력 시도');

    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveValue('');
  },
};
