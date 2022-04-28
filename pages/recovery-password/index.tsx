import type { NextPage } from 'next'
import { RecoveryPassword as Component } from '@/features/auth/RecoveryPassword'
import { LayoutPublic } from '@/layouts/LayoutPublic'

const RecoveryPassword: NextPage = () => (
  <LayoutPublic
    permission="auth"
    theme="auth"
    footer={false}
    width100
    verticalPadding={false}
  >
    <Component />
  </LayoutPublic>
)

export default RecoveryPassword
