import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RecentSearchList } from './recent-search-list';

const meta: Meta<typeof RecentSearchList> = {
  title: 'Widgets/RecentSearchList',
  component: RecentSearchList,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  args: {
    onItemClick: fn(),
    onItemRemove: fn(),
    onClearAll: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof RecentSearchList>;

export const Default: Story = {
  args: {
    items: ['성수', '데이트', '여행', '서울'],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const ClickItem: Story = {
  args: {
    items: ['성수', '데이트', '여행'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('성수'));
    await expect(args.onItemClick).toHaveBeenCalledWith('성수');
  },
};

export const RemoveItem: Story = {
  args: {
    items: ['성수', '데이트', '여행'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('데이트 검색어 삭제'));
    await expect(args.onItemRemove).toHaveBeenCalledWith('데이트');
  },
};

export const ClearAll: Story = {
  args: {
    items: ['성수', '데이트', '여행'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('전체삭제'));
    await expect(args.onClearAll).toHaveBeenCalledTimes(1);
  },
};
