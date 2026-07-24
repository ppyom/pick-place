import type { Meta, StoryObj } from '@storybook/react';

import { OAuthButton } from './oauth-button';

const meta = {
  title: 'Features/OauthLogin',
  component: OAuthButton,
  tags: [],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof OAuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Kakao: Story = {
  args: {
    provider: 'kakao',
  },
};

export const Naver: Story = {
  args: {
    provider: 'naver',
  },
};

export const Google: Story = {
  args: {
    provider: 'google',
  },
};

export const Apple: Story = {
  args: {
    provider: 'apple',
  },
};

export const Disabled: Story = {
  args: {
    provider: 'kakao',
    disabled: true,
  },
};
