import React, { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ModalMessage } from '@/components/modals/ModalMessage'
import { useRedux } from '@/hooks/useRedux'
import { ChangeEmailConfirm } from '@/features/security/containers/ChangeEmailConfirm'
import { FormChangeEmail } from './containers/FormChangeEmail'
import { selectChangeEmail, setStep, reset } from './store/change-email'

export const ChangeEmail: React.FC = () => {
  const { t } = useTranslation('security')
  const [select, dispatch] = useRedux()
  const { step } = select(selectChangeEmail)

  useEffect(
    () => () => {
      dispatch(reset())
    },
    []
  )

  const handleCloseEmail = () => dispatch(setStep(null))

  switch (step) {
    case 'confirm-old':
      return <ChangeEmailConfirm variant="old" />
    case 'change-email':
      return <FormChangeEmail />
    case 'confirm-new':
      return <ChangeEmailConfirm variant="new" />
    case 'success':
      return (
        <ModalMessage
          status="success"
          title={t('change-email.title-success')}
          description={t('change-email.desc-success')}
          onClose={handleCloseEmail}
          onClickButton={handleCloseEmail}
          buttonLabel={t('common:done')}
        />
      )
    case 'error':
      return (
        <ModalMessage
          status="error"
          title={t('common:error')}
          description={t('change-email.desc-error')}
          onClose={handleCloseEmail}
          onClickButton={handleCloseEmail}
        />
      )
    default:
      return <></>
  }
}
