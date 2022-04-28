import type { NextPage } from 'next'
import { SignIn as SignInComponent } from '@/features/auth/SignIn'
import { LayoutPublic } from '@/layouts/LayoutPublic'

const SignIn: NextPage = () => (
  <LayoutPublic
    permission="auth"
    theme="auth"
    footer={false}
    width100
    verticalPadding={false}
  >
    <SignInComponent />
  </LayoutPublic>
)

export default SignIn
