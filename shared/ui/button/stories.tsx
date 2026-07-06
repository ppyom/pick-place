import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Icon } from '@/shared/ui/icon';

import { Button } from './button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: [],
  argTypes: {
    variant: {
      control: 'radio',
      options: BUTTON_VARIANTS,
    },
    size: {
      control: 'radio',
      options: BUTTON_SIZES,
    },
  },
  args: {
    children: '저장하기',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {BUTTON_SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size === 'icon' ? <Icon name="food" size="sm" /> : size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="save" size="sm" />
        저장하기
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
