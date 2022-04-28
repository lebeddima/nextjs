import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon as Component } from './Icon'

export default {
  title: 'Components/Icon',
  component: Component,
  parameters: {
    backgrounds: {
      default: 'brown',
      values: [{ name: 'brown', value: '#a52a2a' }]
    }
  }
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const Primary = Template.bind({})
Primary.args = {}
