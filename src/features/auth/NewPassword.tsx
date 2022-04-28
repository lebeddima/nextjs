import { useEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import useTranslation from 'next-translate/useTranslation'
import { Loader } from '@/components/loaders/Loader'
import { Status } from './components/Status'
import { NewPassword as NewPasswordContainer } from './containers/NewPassword'
import { reset, selectNewPass, checkTokenAsync } from './store/new-password'

export const NewPassword: React.FC = () => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const [select, dispatch] = useRedux()
  const { step } = select(selectNewPass)

  useEffect(() => {
    const { id } = router.query
    if (typeof id !== 'string') return
    dispatch(checkTokenAsync({ token: id }))
  }, [])

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  switch (step) {
    case null:
      return <Loader />
    case 'new-pass':
      return <NewPasswordContainer />
    case 'success':
      return (
        <Status
          status="success"
          title={t('password-changed.title')}
          description={t('password-changed.description')}
          onClickButton={() => router.push(ROUTES.SIGN_IN)}
          buttonLabel={t('password-changed.button')}
        />
      )
    case 'token-error':
      return (
        <Status
          status="error"
          onClose={() => router.push(ROUTES.SIGN_IN)}
          description={t('password-changed.description-error')}
          onClickButton={() => router.push(ROUTES.SIGN_IN)}
          buttonLabel={t('password-changed.button')}
        />
      )
    default:
      return <></>
  }
}
