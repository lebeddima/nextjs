import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '@/components/buttons/Button'
import { Message as MessageComponent } from './Message'

export default {
  title: 'Components/Message',
  component: MessageComponent
} as ComponentMeta<typeof MessageComponent>

const Template: ComponentStory<typeof MessageComponent> = (args) => (
  <MessageComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  size: 'small',
  theme: 'warning',
  title: 'Message Title',
  description: 'Message Description!',
  additionalButton: (
    <Button
      linkTo=""
      label="button"
      underline
      shape="text"
      theme="nav-underline"
      color="text-blue"
      font="text-medium"
    />
  )
}
