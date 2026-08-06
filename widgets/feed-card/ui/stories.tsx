import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Pick } from '@/entities/pick';
import { mockPicks } from '@/entities/pick/model/mock';

import { FeedCard } from './feed-card';

const mockPick: Pick = mockPicks[0];

const meta = {
  title: 'Widgets/FeedCard',
  component: FeedCard,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeedCard>;

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

export const NoDescription: Story = {
  args: {
    pick: { ...mockPick, description: undefined },
  },
};

export const NoMemo: Story = {
  args: {
    pick: {
      ...mockPick,
      places: [{ place: mockPick.places[0].place }],
    },
  },
};

export const NoTags: Story = {
  args: {
    pick: { ...mockPick, tags: [] },
  },
};

export const LongContent: Story = {
  args: {
    pick: {
      ...mockPick,
      title: '서울에서 꼭 가봐야 할 감성 넘치는 소규모 로컬 카페와 베이커리 모음집',
      description:
        '정말 오랜 시간을 들여서 발품 팔아 찾아낸 곳들이에요. 하나하나 다 특색있고 사진 찍기 좋은 곳들만 골랐습니다. 꼭 가보세요!',
      tags: ['카페', '성수동', '감성', '베이커리', '데이트코스', '인스타감성'],
      places: [
        {
          place: mockPick.places[0].place,
          memo: '정말정말정말 맛있고 분위기도 좋아서 재방문 의사 100%인 곳이에요, 강력 추천합니다',
        },
      ],
    },
  },
};

export const ManyBookmarks: Story = {
  args: {
    pick: { ...mockPick, bookmarkCount: 9999 },
  },
};

export const Feed: Story = {
  args: {
    pick: mockPick,
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 375 }}>
      {mockPicks.map((pick) => (
        <FeedCard key={pick.id} pick={pick} />
      ))}
    </div>
  ),
};
