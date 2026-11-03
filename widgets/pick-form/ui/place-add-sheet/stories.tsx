import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { Place } from '@/entities/place';

import { Button } from '@/shared/ui/button';

import { PlaceAddSheet } from './place-add-sheet';

const meta = {
  title: 'Widgets/PlaceAddSheet',
  component: PlaceAddSheet,
  tags: ['!dev'],
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    onClose: { control: false },
    onConfirm: { control: false },
  },
} satisfies Meta<typeof PlaceAddSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAdded: Story = {
  args: {
    addedPlaceIds: ['place-1'],
  },
};

// Controlled 사용 예시
export const Controlled: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [places, setPlaces] = useState<Place[]>([]);

    return (
      <div className="h-100">
        <Button onClick={() => setIsOpen(true)}>장소 추가</Button>
        <p className="typo-body-s mt-2">
          담긴 장소: {places.map((place) => place.name).join(', ') || '-'}
        </p>
        <PlaceAddSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={({ added, removedIds }) =>
            setPlaces((prev) => [...prev.filter((p) => !removedIds.includes(p.id)), ...added])
          }
          addedPlaceIds={places.map((place) => place.id)}
        />
      </div>
    );
  },
};

// 여러 장소를 선택하면 CTA에 개수가 반영되고, 확정하면 onConfirm으로 전달되는지 검증
export const SelectMultiple: Story = {
  render: function Render() {
    const [added, setAdded] = useState<Place[]>([]);

    return (
      <>
        <p data-testid="added">{added.map((place) => place.name).join(',')}</p>
        <PlaceAddSheet isOpen onClose={() => {}} onConfirm={(result) => setAdded(result.added)} />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    const options = await body.findAllByRole('checkbox');
    await userEvent.click(options[0]);
    await userEvent.click(options[1]);

    await userEvent.click(body.getByRole('button', { name: '2개 추가' }));

    await waitFor(() =>
      expect(within(canvasElement).getByTestId('added')).toHaveTextContent(
        '카페 성수연방,블루보틀 성수',
      ),
    );
  },
};

// 이미 담긴 장소는 선택된 상태로 보이고, 해제하면 삭제 대상으로 전달되는지 검증
export const UncheckToRemove: Story = {
  render: function Render() {
    const [removed, setRemoved] = useState<string[]>([]);

    return (
      <>
        <p data-testid="removed">{removed.join(',')}</p>
        <PlaceAddSheet
          isOpen
          onClose={() => {}}
          onConfirm={(result) => setRemoved(result.removedIds)}
          addedPlaceIds={['place-1']}
        />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    const options = await body.findAllByRole('checkbox');
    await expect(options[0]).toHaveAttribute('aria-checked', 'true');
    await expect(body.getByRole('button', { name: '장소를 선택해주세요' })).toBeDisabled();

    await userEvent.click(options[0]);
    await expect(options[0]).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(body.getByRole('button', { name: '1개 삭제' }));

    await waitFor(() =>
      expect(within(canvasElement).getByTestId('removed')).toHaveTextContent('place-1'),
    );
  },
};

// 검색어로 목록이 좁혀지고, 결과가 없으면 안내 문구가 나오는지 검증
export const Search: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const input = await body.findByRole('textbox', { name: '장소 검색' });

    await userEvent.type(input, 'onion');
    await waitFor(() => expect(body.getAllByRole('checkbox')).toHaveLength(1));

    await userEvent.clear(input);
    await userEvent.type(input, '없는장소');
    await body.findByText('검색 결과가 없어요');
  },
};

// 변경 내용이 없으면 CTA가 비활성화되는지 검증
export const DisabledWithoutChanges: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByRole('button', { name: '장소를 선택해주세요' })).toBeDisabled();
  },
};
