import React from 'react'
import { Provider } from 'react-redux'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import store from '@/store/index'
import { NotificationButton } from './NotificationButton'

export default {
  title: 'Components/NotificationButton',
  component: NotificationButton,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as ComponentMeta<typeof NotificationButton>

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
)

export const Primary = Template.bind({})
