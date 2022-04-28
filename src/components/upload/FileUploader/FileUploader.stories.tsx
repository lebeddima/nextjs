import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FileUploader } from './FileUploader'

export default {
  title: 'Components/inputs/FileUploader',
  component: FileUploader
} as ComponentMeta<typeof FileUploader>

const Template: ComponentStory<typeof FileUploader> = (args) => <FileUploader {...args} />

export const WithArgs = Template.bind({})
WithArgs.args = {
  extensions: 'image/jpeg,image/png,image/jpg',
  maxSize: `${5 * 1024 * 1024}`
}
