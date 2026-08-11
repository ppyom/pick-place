import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '@/shared/ui/button';

import { ToastProvider, useToast } from './index';
import { Toast } from './toast';

function ToastDemo() {
  const { showToast } = useToast();

  return (
    <Button type="button" onClick={() => showToast('링크가 복사되었습니다')}>
      토스트 띄우기
    </Button>
  );
}

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['!dev'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '링크가 복사되었습니다',
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('링크가 복사되었습니다')).toBeInTheDocument();
  },
};

export const LongMessage: Story = {
  args: {
    message: '선택한 장소를 컬렉션에 저장했어요. 마이페이지에서 확인할 수 있습니다',
  },
  parameters: {
    layout: 'centered',
  },
};

export const TriggerFromButton: StoryObj<typeof ToastDemo> = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '토스트 띄우기' });

    await userEvent.click(button);

    await expect(canvas.findByText('링크가 복사되었습니다')).resolves.toBeInTheDocument();
  },
};
