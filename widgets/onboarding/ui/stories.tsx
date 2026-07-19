import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Onboarding } from './onboarding';

const meta = {
  title: 'Widgets/Onboarding',
  component: Onboarding,
  tags: [],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onComplete: (selection) => console.debug('onComplete', selection),
  },
} satisfies Meta<typeof Onboarding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
