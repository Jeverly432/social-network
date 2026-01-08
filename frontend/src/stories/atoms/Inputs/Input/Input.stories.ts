
import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, Flex } from '@shared/assets';
import { createElement } from 'react';

const meta = {
  title: 'Social-UI/atoms/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: "Placeholder",
    prefix: createElement(Search),
    suffix: createElement(Flex),
   
  }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    size: "m",
    variant: "square",
  },
};

export const Rounded: Story = {
  args: {
    size: "m",
    variant: "rounded",
  },
};

