import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ButtonIcon } from './ButtonIcon'

export default {
  title: 'Components/buttons/ButtonIcon',
  component: ButtonIcon
} as ComponentMeta<typeof ButtonIcon>

const Template: ComponentStory<typeof ButtonIcon> = (args) => <ButtonIcon {...args} />

export const Small = Template.bind({})
Small.args = {
  theme: 'small',
  icon: 'x'
}
export const Medium = Template.bind({})
Medium.args = {
  theme: 'medium',
  icon: 'x'
}
export const Big = Template.bind({})
Big.args = {
  theme: 'big',
  icon: 'x'
}
