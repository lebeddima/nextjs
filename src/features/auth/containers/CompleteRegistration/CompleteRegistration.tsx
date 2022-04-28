import { Status } from '@/features/auth/components/Status'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import {
  sendEmailAsync as sendEmailSignUp,
  sendSmsAsync as sendSmsSignUp
} from '@/features/auth/store/sign-up'
import { setStep, selectSignIn } from '@/features/auth/store/sign-in'
import { useRedux } from '@/hooks/useRedux'

export const CompleteRegistration: React.FC = () => {
  const { t } = useTranslation('auth')
  const router = useRouter()
  const [select, dispatch] = useRedux()
  const { activationStep } = select(selectSignIn)

  const handleContinue = () => {
    if (activationStep === 'sms') {
      router.push(ROUTES.SIGN_UP)
      dispatch(sendSmsSignUp())
      return
    }
    router.push(ROUTES.SIGN_UP)
    dispatch(sendEmailSignUp())
  }

  const handleClose = () => {
    dispatch(setStep(null))
  }

  return (
    <Status
      onClose={handleClose}
      title={t('complete-registration.title')}
      description={t('complete-registration.description')}
      buttonLabel={t('common:continue')}
      onClickButton={handleContinue}
    />
  )
}
