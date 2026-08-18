import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LIST_ITEM_VARIANTS } from './constants';
import { ListItem } from './list-item';

const meta = {
  title: 'UI/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'select', options: LIST_ITEM_VARIANTS },
  },
  args: {
    label: '프로필 편집',
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    href: '#',
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert('clicked'),
  },
};

export const Disabled: Story = {
  args: {
    label: '로그아웃 중…',
    onClick: () => alert('clicked'),
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    label: '회원 탈퇴',
    onClick: () => alert('clicked'),
    variant: 'danger',
  },
};

export const Static: Story = {
  args: {
    label: '버전',
    value: '0.1.0',
  },
};
