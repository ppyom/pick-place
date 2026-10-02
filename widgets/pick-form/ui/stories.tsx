import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { MAX_TAGS } from '../model/use-tag-input';
import { TagInput } from './tag-input';

const meta = {
  title: 'Widgets/TagInput',
  component: TagInput,
  tags: [],
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: false },
    onChange: { control: false },
  },
  args: {
    value: [],
    onChange: () => {},
  },
} satisfies Meta<typeof TagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithTags: Story = {
  args: {
    value: ['성수', '데이트', '브런치'],
  },
};

export const Full: Story = {
  args: {
    value: Array.from({ length: MAX_TAGS }, (_, i) => `태그${i + 1}`),
  },
};

// Controlled 사용 예시
export const Controlled: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>(['성수']);

    return <TagInput value={tags} onChange={setTags} />;
  },
};

// 입력 → 추가 버튼 클릭으로 태그가 추가되는지 검증
export const AddOnClick: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>([]);

    return <TagInput value={tags} onChange={setTags} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('태그를 입력해보세요');
    const addButton = canvas.getByRole('button', { name: '추가' });

    await userEvent.type(input, '#성수');
    await userEvent.click(addButton);

    await expect(canvas.getByText('#성수')).toBeInTheDocument();
    await expect(input).toHaveValue('');
  },
};

// 중복 태그는 추가되지 않는지 검증
export const PreventsDuplicate: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>(['성수']);

    return <TagInput value={tags} onChange={setTags} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('태그를 입력해보세요');
    const addButton = canvas.getByRole('button', { name: '추가' });

    await userEvent.type(input, '성수');

    await expect(addButton).toBeDisabled();
    await expect(canvas.getAllByText('#성수')).toHaveLength(1);
  },
};

// 삭제 버튼으로 태그를 제거하는지 검증
export const RemoveTag: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>(['성수', '데이트']);

    return <TagInput value={tags} onChange={setTags} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole('button', { name: '성수 태그 삭제' });

    await userEvent.click(removeButton);

    await expect(canvas.queryByText('#성수')).not.toBeInTheDocument();
    await expect(canvas.getByText('#데이트')).toBeInTheDocument();
  },
};

// 최대 개수에 도달하면 입력/추가가 막히는지 검증
export const StopsAtMax: Story = {
  render: function Render() {
    const [tags, setTags] = useState<string[]>(
      Array.from({ length: MAX_TAGS - 1 }, (_, i) => `태그${i + 1}`),
    );

    return <TagInput value={tags} onChange={setTags} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByRole('button', { name: '추가' });

    await userEvent.type(canvas.getByPlaceholderText('태그를 입력해보세요'), '마지막태그');
    await userEvent.click(addButton);

    const input = canvas.getByPlaceholderText(`최대 ${MAX_TAGS}개까지 추가할 수 있어요`);
    await expect(input).toBeDisabled();
    await expect(canvas.getByRole('button', { name: '추가' })).toBeDisabled();
  },
};
