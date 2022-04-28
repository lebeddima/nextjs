import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input as InputComponent } from './Input'

export default {
  title: 'Components/inputs/Input',
  component: InputComponent
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => (
  <InputComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  theme: 'primary',
  placeholder: 'Placeholder',
  label: { label: 'Label', additionalLabel: 'additionalLabel' },
  error: 'Error'
}

export const PrimarySmall = Template.bind({})
PrimarySmall.args = {
  theme: 'primary-small',
  placeholder: 'Placeholder',
  label: { label: 'Label', additionalLabel: 'additionalLabel' },
  error: 'Error'
}
