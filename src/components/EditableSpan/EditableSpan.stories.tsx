import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    initialTitle: {
      description: 'Start value empty. Add value push button set string.'
    },
    handleOnBlur: {
      description: 'Value EditableSpan changed'
    }
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
  args: {
    initialTitle: 'span',
    handleOnBlur: action('Value EditableSpan changed')
  }
};