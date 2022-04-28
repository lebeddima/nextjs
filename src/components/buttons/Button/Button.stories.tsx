import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button as Component } from './Button'

export default {
  title: 'Components/buttons/Button',
  component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Post</Component>
)

export const Primary = Template.bind({})
Primary.args = {
  theme: 'primary',
  label: 'Primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  theme: 'secondary',
  label: 'Secondary'
}

export const TabGreen = Template.bind({})
TabGreen.args = {
  theme: 'tab-green-big',
  label: 'Tab green',
  additionalState: true
}

export const NavUnderline = Template.bind({})
NavUnderline.args = {
  theme: 'nav-underline',
  label: 'Nav underline',
  additionalState: false
}
