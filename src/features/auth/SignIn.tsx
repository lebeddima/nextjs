import { useEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { Loader } from '@/components/loaders/Loader'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import useTranslation from 'next-translate/useTranslation'
import { CompleteRegistration } from './containers/CompleteRegistration'
import { VerifyEmail } from './containers/VerifyEmail'
import { VerifyPhone } from './containers/VerifyPhone'
import { Status } from './components/Status'
import { FormSignIn } from './containers/FormSignIn'
import { reset, selectSignIn, setStep } from './store/sign-in'
import { SignIn2fa } from './containers/SignIn2fa'

export const SignIn: React.FC = () => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const [select, dispatch] = useRedux()
  const { step, fetchingGlobal, error } = select(selectSignIn)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleCloseModals = () => dispatch(setStep(null))

  if (fetchingGlobal) return <Loader />

  switch (step) {
    case null:
      return <FormSignIn />
    case 'EMAIL':
      return <VerifyEmail />
    case 'error-email':
      return (
        <Status status="error" description={error} onClickButton={handleCloseModals} />
      )
    case 'PHONE':
      return <VerifyPhone />
    case 'GOOGLE':
      return <SignIn2fa />
    case 'error-phone':
      return (
        <Status status="error" description={error} onClickButton={handleCloseModals} />
      )
    case 'error-times':
      return (
        <Status
          status="error"
          title={t('sign-in.tree-times-title')}
          description={t('sign-in.tree-times-desc')}
          buttonLabel={t('sign-in.tree-times-button')}
          onClickButton={() => router.push(ROUTES.HOME)}
        />
      )
    case 'complete-registration':
      return <CompleteRegistration />
    default:
      return <></>
  }
}
