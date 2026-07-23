import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './divider';

const meta = {
  title: 'UI/Divider',
  component: Divider,
  tags: [],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <span className="text-body-m">Left</span>
      <Divider orientation="vertical" />
      <span className="text-body-m">Right</span>
    </div>
  ),
};
