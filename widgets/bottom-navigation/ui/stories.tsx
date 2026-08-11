import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BottomNavigation } from './bottom-navigation';

const meta = {
  title: 'Widgets/BottomNavigation',
  component: BottomNavigation,
  tags: ['!dev'],
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: { nextjs: { navigation: { pathname: '/' } } },
};

export const Explore: Story = {
  parameters: { nextjs: { navigation: { pathname: '/explore' } } },
};

export const My: Story = {
  parameters: { nextjs: { navigation: { pathname: '/my' } } },
};
