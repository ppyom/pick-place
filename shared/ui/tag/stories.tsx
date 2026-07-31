import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './tag';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  tags: ['!dev'],
  args: {
    children: '성수',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleWithWrap: Story = {
  render: () => (
    <div className="flex max-w-60 flex-wrap gap-2">
      <Tag>성수</Tag>
      <Tag>데이트</Tag>
      <Tag>브런치</Tag>
      <Tag>루프탑</Tag>
      <Tag>주차가능</Tag>
    </div>
  ),
};
