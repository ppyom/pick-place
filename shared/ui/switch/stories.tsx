import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Switch } from './switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: [],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: false },
    onCheckedChange: { control: false },
  },
  args: {
    checked: false,
    onCheckedChange: () => {},
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

// Controlled 사용 예시
export const Controlled: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
};

// 클릭 시 토글 동작 검증
export const ToggleOnClick: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false);

    return <Switch checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');

    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
  },
};

// disabled 시 클릭 차단 검증
export const DisabledBlocksToggle: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');

    await userEvent.click(toggle);

    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await expect(toggle).toHaveAttribute('aria-disabled', 'true');
  },
};
