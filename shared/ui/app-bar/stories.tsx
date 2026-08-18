import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '@/shared/ui/input';

import { AppBar } from './app-bar';

const meta = {
  title: 'UI/AppBar',
  component: AppBar,
  tags: ['!dev'],
  args: {
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  render: () => (
    <AppBar>
      <AppBar.Title>탐색</AppBar.Title>
    </AppBar>
  ),
};

export const BackWithTitle: Story = {
  render: () => (
    <AppBar>
      <AppBar.Back onClick={() => alert('back')} />
      <AppBar.Title>설정</AppBar.Title>
    </AppBar>
  ),
};

export const TitleWithRightAction: Story = {
  render: () => (
    <AppBar>
      <AppBar.Title>My</AppBar.Title>
      <AppBar.RightAction icon="settings" onClick={() => alert('settings')} label="설정" />
    </AppBar>
  ),
};

export const SearchOnly: Story = {
  render: () => (
    <AppBar>
      <AppBar.Search>
        <Input leftIcon="search" placeholder="장소, 지역, 태그 검색" />
      </AppBar.Search>
    </AppBar>
  ),
};

export const BackWithSearch: Story = {
  render: () => (
    <AppBar>
      <AppBar.Back onClick={() => alert('back')} />
      <AppBar.Search>
        <Input leftIcon="search" placeholder="장소, 지역, 태그 검색" />
      </AppBar.Search>
    </AppBar>
  ),
};
