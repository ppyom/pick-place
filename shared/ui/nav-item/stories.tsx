import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ICONS } from '@/shared/ui/icon';

import { NavItem } from './nav-item';

const iconNames = Object.keys(ICONS) as Array<keyof typeof ICONS>;

const meta = {
  title: 'UI/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', options: iconNames },
    active: { control: 'boolean' },
    href: { control: false },
    className: { control: false },
  },
  args: {
    icon: 'home',
    label: '홈',
    href: '#',
  },
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { active: true },
};

export const Inactive: Story = {
  args: { active: false },
};
