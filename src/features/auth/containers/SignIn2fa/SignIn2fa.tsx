import { useRedux } from '@/hooks/useRedux'
import useTranslation from 'next-translate/useTranslation'
import { Card } from '@/components/Card'
import { SendCode } from '@/components/SendCode'
import {
  sendGoogle2faCodeAsync,
  setError,
  setStep,
  selectSignIn
} from '../../store/sign-in'
import s from './SignIn2fa.module.scss'

export const SignIn2fa: React.FC = () => {
  const { t } = useTranslation('common')
  const [select, dispatch] = useRedux()
  const { error, fetching } = select(selectSignIn)

  const handlClose = () => {
    dispatch(setStep(null))
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const handleSubmit = (code: string) => {
    dispatch(sendGoogle2faCodeAsync(code))
  }

  return (
    <Card theme="small" maxWidth="485px" onClose={handlClose}>
      <SendCode
        icon="google"
        title={t('auth:code-2fa.title')}
        description={t('auth:code-2fa.description')}
        clearError={handleClearError}
        onSubmit={handleSubmit}
        error={error}
        loading={fetching}
        confirmButtonClassName={s.confirm}
      />
    </Card>
  )
}
