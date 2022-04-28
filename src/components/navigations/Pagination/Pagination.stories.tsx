import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Pagination as PaginationComponent } from './Pagination'

export default {
  title: 'Components/navigation/Pagination',
  component: PaginationComponent
} as ComponentMeta<typeof PaginationComponent>

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
  <PaginationComponent {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  lastPage: 10,
  currentPage: 1
}
