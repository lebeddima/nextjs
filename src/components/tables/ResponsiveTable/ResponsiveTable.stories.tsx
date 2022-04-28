import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ResponsiveTable as ResponsiveTableComponent } from './index'

export default {
  title: 'Components/ResponsiveTable',
  component: ResponsiveTableComponent
} as ComponentMeta<typeof ResponsiveTableComponent>

const Template: ComponentStory<typeof ResponsiveTableComponent> = (args) => (
  <ResponsiveTableComponent {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  data: [
    {
      id: 1,
      name: 'asdasdsasdasdasdasdasdsasdasdasdasdasd',
      pass: '123'
    },
    {
      id: 2,
      name: 'asdasdsasdasdasdasdasdsasdasdasdasdasd',
      pass: '2558'
    },
    {
      id: 3,
      name: 'asdasdasdsasdasdasdasdasdsasdasdasdasd',
      pass: '2558'
    }
  ],
  header: [
    {
      value: 'id',
      label: 'Id',
      notHidden: false
    },
    {
      value: 'name',
      label: 'name'
    },
    {
      value: 'pass',
      label: 'password'
    }
  ]
}
