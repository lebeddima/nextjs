import { NextPage } from 'next'
import { ErrorPage } from '@/containers/error/ErrorPage'
import { LayoutPublic } from '@/layouts/LayoutPublic'
import { ErrorStatus } from '@/types/error'

const InternalServerError: NextPage = () => (
  <LayoutPublic footer={false}>
    <ErrorPage statusCode={ErrorStatus.Server} />
  </LayoutPublic>
)

export default InternalServerError
