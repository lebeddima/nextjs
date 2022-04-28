import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Status as StatusComponent } from './Status'

export default {
  title: 'Components/Status',
  component: StatusComponent
} as ComponentMeta<typeof StatusComponent>

const Template: ComponentStory<typeof StatusComponent> = (args) => (
  <StatusComponent {...args} />
)

export const WithArgs = Template.bind({})
WithArgs.args = {
  title: 'Title',
  buttonLabel: 'Button label',
  description: 'Description',
  status: 'success'
}
