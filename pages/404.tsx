import { NextPage } from 'next'
import { LayoutPublic } from '@/layouts/LayoutPublic'
import { ErrorPage } from '@/containers/error/ErrorPage'
import { ErrorStatus } from '@/types/error'

const NotFoundPage: NextPage = () => (
  <LayoutPublic footer={false}>
    <ErrorPage statusCode={ErrorStatus.NotFound} />
  </LayoutPublic>
)

export default NotFoundPage
