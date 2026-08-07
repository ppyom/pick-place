import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { CategoryFilterBar } from './category-filter-bar';

const categories = [
  { id: 'all', label: '전체' },
  { id: 'restaurant', label: '맛집' },
  { id: 'cafe', label: '카페' },
  { id: 'date', label: '데이트' },
  { id: 'seoul', label: '서울' },
  { id: 'gyeonggi', label: '경기' },
  { id: 'incheon', label: '인천' },
];

const meta: Meta<typeof CategoryFilterBar> = {
  title: 'Widgets/CategoryFilterBar',
  component: CategoryFilterBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof CategoryFilterBar>;

function CategoryFilterBarWithState() {
  const [selectedId, setSelectedId] = useState('all');

  return (
    <CategoryFilterBar categories={categories} selectedId={selectedId} onSelect={setSelectedId} />
  );
}

export const Default: Story = {
  render: () => <CategoryFilterBarWithState />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const allChip = canvas.getByRole('button', { name: '전체' });
    const cafeChip = canvas.getByRole('button', { name: '카페' });

    // 초기 상태: '전체' 선택됨
    await expect(allChip).toHaveAttribute('aria-pressed', 'true');
    await expect(cafeChip).toHaveAttribute('aria-pressed', 'false');

    // '카페' 클릭 시 선택 전환
    await userEvent.click(cafeChip);

    await expect(cafeChip).toHaveAttribute('aria-pressed', 'true');
    await expect(allChip).toHaveAttribute('aria-pressed', 'false');
  },
};

export const Selected: Story = {
  args: {
    categories,
    selectedId: 'cafe',
    onSelect: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cafeChip = canvas.getByRole('button', { name: '카페' });

    await expect(cafeChip).toHaveAttribute('aria-pressed', 'true');
  },
};
