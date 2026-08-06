import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { BookmarkToggleButton } from './bookmark-toggle-button';

const meta = {
  title: 'Features/ToggleBookmark',
  component: BookmarkToggleButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BookmarkToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pickId: 'pick-1',
    initialCount: 128,
  },
};

export const InitiallyBookmarked: Story = {
  args: {
    pickId: 'pick-1',
    initialCount: 129,
    initialBookmarked: true,
  },
};

export const ZeroCount: Story = {
  args: {
    pickId: 'pick-2',
    initialCount: 0,
  },
};

export const ToggleOnClick: Story = {
  args: {
    pickId: 'pick-1',
    initialCount: 128,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('129')).toBeInTheDocument();

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(canvas.getByText('128')).toBeInTheDocument();
  },
};
