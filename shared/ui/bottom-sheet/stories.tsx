import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { BottomSheet } from './bottom-sheet';

const meta = {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTitleAndFooter: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-100">
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BottomSheet.Title>장소 추가</BottomSheet.Title>
          <BottomSheet.Body className="space-y-4">
            <Input leftIcon="search" placeholder="장소, 지역, 태그 검색" />
            <ul className="flex flex-col gap-3 pb-4">
              {['성수 브런치 카페', '한강 러닝 코스', '이태원 루프탑 바'].map((place) => (
                <li key={place} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="typo-body-m text-text-primary">{place}</span>
                </li>
              ))}
            </ul>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              2개 추가
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>
      </div>
    );
  },
};

export const BodyOnly: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-100">
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BottomSheet.Body>
            <p className="typo-body-m text-text-primary py-4">
              Title 없이 Body만 구성할 수도 있습니다. 이 경우 닫기 버튼은 렌더링되지 않으며,
              오버레이 클릭이나 Escape 키로 닫아야 합니다.
            </p>
          </BottomSheet.Body>
        </BottomSheet>
      </div>
    );
  },
};

export const Closed: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="h-100">
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BottomSheet.Title>장소 추가</BottomSheet.Title>
          <BottomSheet.Body>내용</BottomSheet.Body>
        </BottomSheet>
      </div>
    );
  },
};
