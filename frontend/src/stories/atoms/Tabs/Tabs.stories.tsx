
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '@shared/ui';
import { Tabs as TabsIcons } from "@shared/assets"

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

const iconItems = [
  {
    key: '1',
    label: <TabsIcons.Posts />
  },
  {
    key: '2',
    label: <TabsIcons.Pinned />
  },
  {
    key: '3',
    label: <TabsIcons.Gallery />
  },
  {
    key: '4',
    label: <TabsIcons.Video />
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
    items: iconItems,
    variant: 'icon',
  },
};
