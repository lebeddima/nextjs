import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/buttons/Button'
import { useState } from 'react'
import { Message } from '@/components/Message'

export const VerifyNotification: React.FC = () => {
  const { t } = useTranslation('kyc')

  const isUserConfirmed = false
  const [isMessageOpen, setMessageOpen] = useState(!isUserConfirmed)

  if (!isMessageOpen) return null

  return (
    <Message
      title={t('notification.verification-required')}
      description={t('notification.verification-message')}
      size="micro"
      theme="warning"
      closeSize="small"
      additionalButton={
        <Button
          linkTo={ROUTES.CABINET_KYC}
          label={t('notification.verification-link')}
          underline
          shape="text"
          theme="nav-underline"
          color="text-blue"
        />
      }
      onClose={() => {
        setMessageOpen(false)
      }}
    />
  )
}
