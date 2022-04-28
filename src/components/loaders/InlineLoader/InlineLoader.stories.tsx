import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { InlineLoader as InlineLoaderComponent } from './InlineLoader'

export default {
  title: 'Components/loaders/InlineLoader',
  component: InlineLoaderComponent
} as ComponentMeta<typeof InlineLoaderComponent>

const Template: ComponentStory<typeof InlineLoaderComponent> = (args) => (
  <InlineLoaderComponent {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  width: '100%',
  height: 4,
  isLoading: true,
  radius: 'rounded',
  color: 'blue'
}
