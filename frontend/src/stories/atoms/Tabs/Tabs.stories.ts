
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '@shared/ui';


const items = [
  {
    key: '1',
    label: 'Tab 1',
  },
  {
    key: '2',
    label: 'Tab 2',
  }
]

const meta = {
  title: 'Social-UI/atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {

  }
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: items,
    variant: 'secondary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'icon',
  },
};
