import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Loader as LoaderComponent } from './Loader'

export default {
  title: 'Components/loaders/Loader',
  component: LoaderComponent
} as ComponentMeta<typeof LoaderComponent>

const Template: ComponentStory<typeof LoaderComponent> = (args) => (
  <LoaderComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  colorStroke: 'blue',
  bgColor: 'background'
}
