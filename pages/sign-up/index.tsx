import type { NextPage } from 'next'
import { LayoutPublic } from '@/layouts/LayoutPublic'
import { SignUp as SignUpComponent } from '@/features/auth/SignUp'

const SignUp: NextPage = () => (
  <LayoutPublic
    permission="auth"
    theme="auth"
    footer={false}
    width100
    verticalPadding={false}
  >
    <SignUpComponent />
  </LayoutPublic>
)

export default SignUp
