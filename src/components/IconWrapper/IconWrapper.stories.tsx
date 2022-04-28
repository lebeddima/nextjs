import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// import btcImg from '@/images/btc.png'
import { IconWrapper as Component } from './IconWrapper'

export default {
  title: 'Components/IconWrapper',
  component: Component
} as ComponentMeta<typeof Component>

// const TemplateImage: ComponentStory<typeof Component> = (args) => <Component {...args} />
//
// export const Image = TemplateImage.bind({})
// Image.args = {
//   imgLink: btcImg,
//   color: 'red',
//   width: 16
// }

const TemplateNested: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    <Component color="red" width={16} />
  </Component>
)

export const Nested = TemplateNested.bind({})
Nested.args = {
  colorTheme: 'back-icon',
  width: 32
}
