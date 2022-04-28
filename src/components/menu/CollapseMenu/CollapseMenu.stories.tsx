import React from 'react'
import { Target } from '@/components/accordions/Target'
import { Card } from '@/components/Card'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CollapseMenu as Component } from './CollapseMenu'

export default {
  title: 'Components/menu/CollapseMenu',
  component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const Primary = Template.bind({})
Primary.args = {
  wrapper: <Card theme="micro" />,
  target: <Target text="Target text" />,
  folding: (
    <div>
      With your permission we and our partners may use precise geolocation data and
      identification through device scanning. You may click to consent to our and our
      partners’ processing as described above. Alternatively you may access more detailed
      information and change your preferences before consenting or to refuse consenting.
    </div>
  )
}
