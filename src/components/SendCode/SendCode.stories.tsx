import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SendCode } from './SendCode'

export default {
  title: 'Components/SendCode',
  component: SendCode,
  argTypes: {
    onSubmit: { action: 'click' },
    onClickEgain: { action: 'click' },
    onClickLink: { action: 'click' },
    onSubmitCode: { action: 'click' },
    onChangeCode: { action: 'onChange' }
  }
} as ComponentMeta<typeof SendCode>

const Template: ComponentStory<typeof SendCode> = (args) => <SendCode {...args} />

export const Primary = Template.bind({})
Primary.args = {
  icon: 'phone',
  title: 'Title',
  description: 'Description',
  linkText: 'Link text',
  linkButtonText: 'Link button text',
  sendEgainTimeout: 60 * 1000,
  fetchingResend: false,
  loading: false
}

export const PrimaryWithError = Template.bind({})
PrimaryWithError.args = {
  ...Primary.args,
  error: 'Error'
}
