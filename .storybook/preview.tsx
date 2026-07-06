import type { Preview } from '@storybook/nextjs-vite';

import { suite } from '../shared/assets/fonts';

import '@/shared/styles/globals.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Design System', 'UI', 'Entities', 'Features', 'Widgets'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    (Story) => (
      <div className={suite.variable}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
