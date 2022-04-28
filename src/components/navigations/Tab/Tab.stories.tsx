import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button as ButtonComponent } from '@/components/buttons/Button'
import { Tab as TabComponent } from './Tab'

export default {
  title: 'Components/navigation/Tab',
  component: TabComponent
} as ComponentMeta<typeof TabComponent>

const Template_two: ComponentStory<typeof TabComponent> = (args) => (
  <TabComponent {...args}>
    <ButtonComponent label="Open orders" theme="tab-red-big" />
    <ButtonComponent label="Orders history" theme="tab-green-big" />
  </TabComponent>
)

const Template_multiple: ComponentStory<typeof TabComponent> = (args) => (
  <TabComponent {...args}>
    <ButtonComponent label="Open orders" theme="tab-blue-small" />
    <ButtonComponent label="Orders history" theme="tab-blue-small" />
    <ButtonComponent label="Trade history" theme="tab-blue-small" />
  </TabComponent>
)

export const Two = Template_two.bind({})
Two.args = {}

export const Multiple = Template_multiple.bind({})
Multiple.args = {
  widthButton: '33.33%',
  widthContainer: '100%'
}
