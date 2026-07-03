import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ICON_SIZES, ICONS } from './contants';
import { Icon } from './icon';

const iconNames = Object.keys(ICONS) as Array<keyof typeof ICONS>;
const iconSizes = Object.keys(ICON_SIZES) as Array<keyof typeof ICON_SIZES>;

const meta = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['!dev'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: {
      control: 'radio',
      options: iconSizes,
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 4, step: 0.5 },
    },
    className: {
      control: false,
    },
  },
  args: {
    name: 'heart',
    size: 'md',
    strokeWidth: 2,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-6">
      {iconSizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon {...args} size={size} />
          <span className="typo-caption text-text-tertiary">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const StrokeWidth: Story = {
  render: (args) => (
    <div className="flex items-end gap-6">
      {[1, 1.5, 2, 2.5, 3].map((strokeWidth) => (
        <div key={strokeWidth} className="flex flex-col items-center gap-2">
          <Icon {...args} size="lg" strokeWidth={strokeWidth} />
          <span className="typo-caption text-text-tertiary">{strokeWidth}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6">
      {iconNames
        .filter((name) => name !== 'empty')
        .map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon name={name} size="lg" />
            <span className="typo-caption text-text-tertiary">{name}</span>
          </div>
        ))}
    </div>
  ),
};
