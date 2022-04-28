import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select as SelectComponent } from './Select'

export default {
  title: 'Components/inputs/Select',
  component: SelectComponent
} as ComponentMeta<typeof SelectComponent>

const Template: ComponentStory<typeof SelectComponent> = (args) => (
  <SelectComponent {...args} />
)

const options = [
  {
    value: 'test1',
    label: 'Test1'
  },
  {
    value: 'test2',
    label: 'Test2'
  },
  {
    value: 'test3',
    label: 'Test3'
  }
]

export const Primary = Template.bind({})
Primary.args = {
  name: 'feeSelect',
  defaultValue: options[0],
  options
}
