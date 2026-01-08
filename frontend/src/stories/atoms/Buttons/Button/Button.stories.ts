import { Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Social-UI/atoms/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args:{
    children: "Button"
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "l",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    size: "l",
    variant: "secondary",
  },
};

export const Inverse: Story = {
  args: {
    size: "l",
    variant: "inverse"
  },
};

