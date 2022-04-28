import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InputPhone as InputPhoneComponent } from './InputPhone'

export default {
  title: 'Components/inputs/InputPhone',
  component: InputPhoneComponent
} as ComponentMeta<typeof InputPhoneComponent>

const Template: ComponentStory<typeof InputPhoneComponent> = (args) => (
  <InputPhoneComponent {...args} />
)

export const WithArgs = Template.bind({})
WithArgs.args = {
  label: { label: 'Phone number' },
  placeholder: '123456789',
  disabled: false,
  readOnly: false,
  error: '',
  menuShort: true
}
