import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import { Support } from '@/features/support/Support'

const SupportPage: NextPage = () => (
  <LayoutCabinet>
    <Support />
  </LayoutCabinet>
)

export default SupportPage
