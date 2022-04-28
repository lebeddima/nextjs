import { useEffect } from 'react'
import { useRedux } from '@/hooks/useRedux'
import { getCountryAsync, selectCountry } from '@/store/country'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { FormSignUp } from './containers/FormSignUp'
import { ConfirmEmail } from './containers/ConfirmEmail'
import { ConfirmPhone } from './containers/ConfirmPhone'
import { Status } from './components/Status'
import { reset, selectSignUp, setStep } from './store/sign-up'

export const SignUp: React.FC = () => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const [select, dispatch] = useRedux()
  const { step, error } = select(selectSignUp)
  const { countries } = select(selectCountry)

  useEffect(() => {
    if (countries.init) return
    dispatch(getCountryAsync())
  }, [])

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleCloseEmailErr = () => dispatch(setStep(null))

  const handleClosePhoneErr = () => dispatch(setStep('email'))

  switch (step) {
    case null:
      return <FormSignUp />
    case 'email':
      return <ConfirmEmail />
    case 'error-email':
      return (
        <Status status="error" description={error} onClickButton={handleCloseEmailErr} />
      )
    case 'phone':
      return <ConfirmPhone />
    case 'error-phone':
      return (
        <Status status="error" description={error} onClickButton={handleClosePhoneErr} />
      )
    case 'success':
      return (
        <Status
          status="success"
          description={t('sign-up-success.description')}
          onClickButton={() => router.push(ROUTES.SIGN_IN)}
          buttonLabel={t('go-to-login')}
        />
      )
    default:
      return <></>
  }
}
