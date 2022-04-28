import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ContextMenu as ContextMenuComponent } from './ContextMenu'

export default {
  title: 'Components/menu/ContextMenu',
  component: ContextMenuComponent
} as ComponentMeta<typeof ContextMenuComponent>

const Template: ComponentStory<typeof ContextMenuComponent> = (args) => (
  <ContextMenuComponent {...args}>
    <span>children</span>
  </ContextMenuComponent>
)

export const Primary = Template.bind({})
Primary.args = {
  trigger: <button type="button">trigger</button>,
  position: 'bottom center',
  offsetX: 10,
  offsetY: 10,
  contentStyle: {
    color: 'blue'
  }
}
