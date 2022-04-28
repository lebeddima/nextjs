import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DatePicker } from './DatePicker'

export default {
  title: 'Components/inputs/DatePicker',
  component: DatePicker
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />

export const WithArgs = Template.bind({})
WithArgs.args = {
  theme: 'primary',
  placeholder: 'MM/DD/YYYY',
  disable: false,
  shape: 'small',
  label: { label: 'Date of birth' },
  readOnly: false,
  clear: false,
  range: false,
  name: 'dateOfBirth',
  type: 'date',
  firstDayOfWeek: 1,
  id: 'date',
  format: 'MM/dd/yyyy',
  fromMonth: new Date(2000, 1),
  toMonth: new Date()
}

export const WithError = Template.bind({})
WithError.args = {
  error: 'Wrong date',
  ...WithArgs.args
}
