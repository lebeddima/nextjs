import type { NextPage } from 'next'
import { LayoutPublic } from '@/layouts/LayoutPublic'
import { Start } from '@/features/home/Start'
import { Commercial } from '@/features/home/Commercial'
import { Secure } from '@/features/home/Secure'
import { Steps } from '@/features/home/Steps'

const Home: NextPage = () => (
  <LayoutPublic contentColor="white" bgColor="white" verticalPadding={false}>
    <Start />
    <Commercial />
    <Secure />
    <Steps />
  </LayoutPublic>
)

export default Home
