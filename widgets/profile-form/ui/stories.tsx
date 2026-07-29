import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ProfileForm } from './profile-form';

const meta = {
  title: 'Widgets/ProfileForm',
  component: ProfileForm,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  args: {
    onSubmit: fn(),
    onCancel: fn(),
    onAvatarChange: fn(),
  },
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValues: Story = {
  args: {
    defaultValues: {
      nickname: '놀러가요',
      bio: '맛집이랑 여행지 기록하는 걸 좋아해요.',
    },
    avatarSrc: 'https://github.com/ppyom.png',
  },
};

export const ValidationError: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: '저장' });

    await userEvent.click(submitButton);

    const errorMessage = await canvas.findByText('닉네임은 2자 이상 입력해주세요.');
    await expect(errorMessage).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SubmitSuccess: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const nicknameInput = canvas.getByPlaceholderText('닉네임을 입력해주세요');
    const submitButton = canvas.getByRole('button', { name: '저장' });

    await userEvent.type(nicknameInput, '테스트닉네임');
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ nickname: '테스트닉네임' }),
      expect.anything(),
    );
  },
};

export const CancelClicked: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cancelButton = canvas.getByRole('button', { name: '취소' });

    await userEvent.click(cancelButton);

    await expect(args.onCancel).toHaveBeenCalled();
  },
};

export const WithoutCancelButton: Story = {
  args: {
    onCancel: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('button', { name: '취소' })).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '저장' })).toBeInTheDocument();
  },
};
