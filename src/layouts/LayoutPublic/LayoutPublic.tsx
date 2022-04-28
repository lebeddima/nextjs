import Head from 'next/head'
import { ECssSelectors } from '@/types/css-selectors'
import cn from 'classnames'
import { Loader } from '@/components/loaders/Loader'
import { useRedux } from '@/hooks/useRedux'
import { ModalError } from '@/containers/error/ModalError'
import { ErrorPage } from '@/containers/error/ErrorPage'
import { selectError } from '@/store/error'
import { useAuth } from '@/hooks/useAuth'
import { Footer } from '@/layouts/Footer'
import { Header } from '@/layouts/Header'
import { PermissionsPublic } from '@/permissions/PermissionsPublic'
import s from './LayoutPublic.module.scss'

type TLayoutPublic = {
  theme?: 'default' | 'auth' | 'market'
  permission?: 'auth'
  title?: string
  description?: string
  keywords?: string
  width100?: boolean
  onScroll?: () => void
  bgColor?: 'white'
  contentColor?: 'white'
  footer?: boolean
  loader?: boolean
  verticalPadding?: boolean
}

export const LayoutPublic: React.FC<TLayoutPublic> = ({
  theme = 'default',
  permission,
  children,
  title = '',
  width100,
  description = '',
  keywords = '',
  onScroll,
  bgColor,
  contentColor,
  footer = true,
  loader = true,
  verticalPadding = true
}) => {
  const [select] = useRedux()
  const { errorPage } = select(selectError)
  const { userFetching } = useAuth()

  const loading = loader && userFetching

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="Keywords" content={keywords} />
      </Head>

      <PermissionsPublic page={permission}>
        <>
          <div className={s.headerCont}>
            <Header />
          </div>

          <div
            className={cn(
              s.container,
              s[`bgColor_${bgColor}`],
              ECssSelectors.Layout,
              s[theme],
              {
                [s.width100]: width100,
                [s.fullScreen]: errorPage,
                [s.verticalPadding]: verticalPadding,
                [s[`bgColor${bgColor}`]]: bgColor
              }
            )}
            onScroll={onScroll}
          >
            <div
              className={cn(
                s.content,

                {
                  [s[`contentColor_${contentColor}`]]: contentColor
                }
              )}
            >
              {loading && <Loader bgColor="background" fixed />}
              {errorPage && <ErrorPage statusCode={errorPage} />}
              {!errorPage && children}
            </div>
            {!errorPage && footer && <Footer />}
            <ModalError />
          </div>
        </>
      </PermissionsPublic>
    </>
  )
}
