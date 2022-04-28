import type { NextPage } from 'next'
import { NewPassword as Component } from '@/features/auth/NewPassword'
import { LayoutPublic } from '@/layouts/LayoutPublic'

const NewPassword: NextPage = () => (
  <LayoutPublic permission="auth" theme="auth" footer={false} width100>
    <Component />
  </LayoutPublic>
)

export default NewPassword
