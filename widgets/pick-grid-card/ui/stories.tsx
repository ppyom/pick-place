import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Pick } from '@/entities/pick';
import { mockPicks } from '@/entities/pick/model/mock';

import { PickGridCard } from './pick-grid-card';

const mockPick: Pick = mockPicks[0];

const meta = {
  title: 'Widgets/PickGridCard',
  component: PickGridCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PickGridCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pick: mockPick,
  },
};

export const Bookmarked: Story = {
  args: {
    pick: { ...mockPick, isBookmarked: true, bookmarkCount: 129 },
  },
};

export const SinglePlace: Story = {
  args: {
    pick: { ...mockPick, places: [mockPick.places[0]] },
  },
};

export const ManyBookmarks: Story = {
  args: {
    pick: { ...mockPick, bookmarkCount: 9999 },
  },
};

export const LongTitle: Story = {
  args: {
    pick: {
      ...mockPick,
      title: '서울에서 꼭 가봐야 할 감성 넘치는 소규모 로컬 카페와 베이커리 모음집',
    },
  },
};

export const NoAvatar: Story = {
  args: {
    pick: {
      ...mockPick,
      author: { id: 'u2', name: '익명', avatarUrl: undefined },
    },
  },
};

export const Grid: Story = {
  args: {
    pick: mockPick,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: 420 }}>
      {mockPicks.map((pick) => (
        <PickGridCard key={pick.id} pick={pick} />
      ))}
    </div>
  ),
};
