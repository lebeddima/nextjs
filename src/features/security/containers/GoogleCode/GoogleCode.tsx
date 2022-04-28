import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { ModalBase } from '@/components/modals/ModalBase'
import { SendCode } from '@/components/SendCode'
import {
  reset,
  selectGoogle2fa,
  setError,
  googleSubmit,
  googleDisable
} from '../../store/google2fa'
import s from './GoogleCode.module.scss'

interface IGoogleCodeProps {
  variant: 'activate' | 'disable'
}

export const GoogleCode: React.FC<IGoogleCodeProps> = ({ variant }) => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { fetching, error } = select(selectGoogle2fa)

  const handleClose = () => {
    dispatch(reset())
  }

  const handleClearError = () => {
    dispatch(setError(''))
  }

  const onSubmit = (code: string) => {
    if (variant === 'activate') {
      dispatch(googleSubmit(code))
      return
    }
    dispatch(googleDisable(code))
  }

  return (
    <ModalBase onClose={handleClose}>
      <SendCode
        icon="google"
        title={t(variant === 'activate' ? '2fa.title' : '2fa.disable-title')}
        description={
          <>
            {variant === 'activate' && (
              <>
                <span className={s.step}> {t('common:step')} 2/3</span>:{' '}
              </>
            )}
            {t('auth:code-2fa.description')}
          </>
        }
        clearError={handleClearError}
        onSubmit={onSubmit}
        error={error}
        loading={fetching}
        confirmButtonClassName={s.continue}
      />
    </ModalBase>
  )
}
