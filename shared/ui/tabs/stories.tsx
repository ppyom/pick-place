import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Tabs } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof ControlledTabs>;

const items = [
  { value: 'mine', label: '내 Pick' },
  { value: 'saved', label: '저장한 Pick' },
];

function ControlledTabs() {
  const [value, setValue] = useState('mine');

  return (
    <div style={{ width: 320 }}>
      <Tabs items={items} value={value} onChange={setValue} />
    </div>
  );
}

export const Default: Story = {
  render: () => <ControlledTabs />,
};

export const SwitchOnClick: Story = {
  render: () => <ControlledTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mineTab = canvas.getByRole('tab', { name: '내 Pick' });
    const savedTab = canvas.getByRole('tab', { name: '저장한 Pick' });

    await expect(mineTab).toHaveAttribute('aria-selected', 'true');
    await expect(savedTab).toHaveAttribute('aria-selected', 'false');

    await userEvent.click(savedTab);
    await expect(savedTab).toHaveAttribute('aria-selected', 'true');
    await expect(mineTab).toHaveAttribute('aria-selected', 'false');
  },
};
