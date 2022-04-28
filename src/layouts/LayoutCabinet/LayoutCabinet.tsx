import Head from 'next/head'
import { ECssSelectors } from '@/types/css-selectors'
import cn from 'classnames'
import { Header } from '@/layouts/Header'
import { Loader } from '@/components/loaders/Loader'
import { useRedux } from '@/hooks/useRedux'
import { ModalError } from '@/containers/error/ModalError'
import { ErrorPage } from '@/containers/error/ErrorPage'
import { Permissions } from '@/permissions/Permissions'
import { selectError } from '@/store/error'
import { useAuth } from '@/hooks/useAuth'
import { SideBar } from '@/layouts/SideBar'
import s from './LayoutCabinet.module.scss'

type TLayoutCabinet = {
  title?: string
  description?: string
  keywords?: string
  onScroll?: () => void
  bgColor?: string
  loader?: boolean
  sidebar?: boolean
}

export const LayoutCabinet: React.FC<TLayoutCabinet> = ({
  children,
  title = '',
  description = '',
  keywords = '',
  onScroll,
  bgColor,
  loader = true,
  sidebar = true
}) => {
  const [select] = useRedux()
  const { errorPage } = select(selectError)
  const { hasAuth } = useAuth()

  const loading = loader && !hasAuth

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="Keywords" content={keywords} />
      </Head>

      <div className={s.headerCont}>
        <Header />
      </div>

      <div className={cn(s.scrollContainer)}>
        <div
          className={cn(s.container, ECssSelectors.Layout)}
          style={{ background: bgColor }}
          onScroll={onScroll}
        >
          {!errorPage && sidebar && <SideBar />}
          <div className={cn(s.content)}>
            {loading && <Loader bgColor="background" fixed />}
            {errorPage && <ErrorPage statusCode={errorPage} />}
            <Permissions>{!errorPage && children}</Permissions>
          </div>
          <ModalError />
        </div>
      </div>
    </>
  )
}
