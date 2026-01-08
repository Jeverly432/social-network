import React from 'react';
import { ActionButton } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Arrow } from '@shared/assets';

const meta = {
  title: 'Social-UI/atoms/Buttons/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "l",
    variant: "primary",
    children: React.createElement(Arrow),
  },
};

export const Secondary: Story = {
  args: {
    size: "l",
    variant: "secondary",
    children: React.createElement(Arrow),
  },
};

export const Inverse: Story = {
  args: {
    size: "l",
    variant: "inverse",
    children: React.createElement(Arrow),
  },
};

