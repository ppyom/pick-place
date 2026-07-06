import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CHIP_SIZES } from '@/shared/ui/chip/constants';
import { Icon } from '@/shared/ui/icon';

import { Chip } from './chip';

const meta = {
  title: 'UI/Chip',
  component: Chip,
  tags: [],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    selected: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
  },
  args: {
    children: '전체',
    size: 'md',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Chip {...args} selected>
        Filled (Selected)
      </Chip>
      <Chip {...args}>Outline (Default)</Chip>
      <Chip {...args} readonly>
        Soft (Readonly)
      </Chip>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    selected: true,
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      {CHIP_SIZES.map((size) => (
        <Chip key={size} {...args} size={size}>
          {size}
        </Chip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    selected: true,
    children: (
      <>
        <Icon name="save" size="sm" className="fill-current" />
        저장
      </>
    ),
  },
};
