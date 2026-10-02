import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { mockPlaces } from '@/entities/place/model/mock';

import { PlaceItem } from './place-item';

const mockPlace = mockPlaces[0];

const meta = {
  title: 'Entities/Pick/PlaceItem',
  component: PlaceItem,
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
} satisfies Meta<typeof PlaceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    place: mockPlace,
    memo: '노트북 펼치기 좋은 2층 자리 있음',
  },
};

export const NoMemo: Story = {
  args: {
    place: mockPlace,
  },
};

export const NoAddress: Story = {
  args: {
    place: { ...mockPlace, address: undefined },
    memo: '주소 정보가 없는 경우',
  },
};

export const LongContent: Story = {
  args: {
    place: {
      ...mockPlace,
      name: '아주아주 길고 긴 이름을 가진 카페 이름 테스트용입니다',
      address: '서울 성동구 연무장길 어딘가에 있는 아주 긴 주소 문자열 테스트',
    },
    memo: '정말정말정말 맛있고 분위기도 좋아서 재방문 의사 100%인 곳이에요, 강력 추천합니다',
  },
};

export const Navigable: Story = {
  args: {
    place: mockPlace,
    memo: '노트북 펼치기 좋은 2층 자리 있음',
    href: `/places/${mockPlace.id}`,
  },
};

export const Removable: Story = {
  args: {
    place: mockPlace,
    memo: '노트북 펼치기 좋은 2층 자리 있음',
    onRemove: () => {},
  },
};

export const List: Story = {
  args: {
    place: mockPlace,
  },
  render: () => (
    <div className="flex flex-col">
      {mockPlaces.map((place, index) => (
        <PlaceItem
          key={place.id}
          place={place}
          memo={index === 0 ? '노트북 펼치기 좋은 2층 자리 있음' : undefined}
          href={`/places/${place.id}`}
        />
      ))}
    </div>
  ),
};

// 편집 가능 모드: 메모 입력 + 삭제
export const Editable: Story = {
  args: {
    place: mockPlace,
  },
  render: function Render() {
    const [memo, setMemo] = useState('노트북 펼치기 좋은 2층 자리 있음');

    return <PlaceItem place={mockPlace} memo={memo} onMemoChange={setMemo} onRemove={() => {}} />;
  },
};

export const EditableEmptyMemo: Story = {
  args: {
    place: mockPlace,
  },
  render: function Render() {
    const [memo, setMemo] = useState('');

    return <PlaceItem place={mockPlace} memo={memo} onMemoChange={setMemo} onRemove={() => {}} />;
  },
};

// 메모 입력 동작 검증
export const EditableTyping: Story = {
  args: {
    place: mockPlace,
  },
  render: function Render() {
    const [memo, setMemo] = useState('');

    return <PlaceItem place={mockPlace} memo={memo} onMemoChange={setMemo} onRemove={() => {}} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const memoInput = canvas.getByPlaceholderText('메모를 남겨보세요');

    await userEvent.type(memoInput, '창가 자리 추천');

    await expect(memoInput).toHaveValue('창가 자리 추천');
  },
};

// 편집 모드에서 삭제 버튼 동작 검증
export const EditableRemove: Story = {
  args: {
    place: mockPlace,
  },
  render: function Render() {
    const [removed, setRemoved] = useState(false);

    if (removed) return <p className="typo-body-s text-text-tertiary">삭제됨</p>;

    return (
      <PlaceItem
        place={mockPlace}
        memo="노트북 펼치기 좋은 2층 자리 있음"
        onMemoChange={() => {}}
        onRemove={() => setRemoved(true)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole('button', { name: `${mockPlace.name} 삭제` });

    await userEvent.click(removeButton);

    await expect(canvas.getByText('삭제됨')).toBeInTheDocument();
  },
};
