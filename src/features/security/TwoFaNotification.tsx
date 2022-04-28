import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/routes'
import { Button } from '@/components/buttons/Button'
import { Message } from '@/components/Message'
import { useAuth } from '@/hooks/useAuth'
import { useRedux } from '@/hooks/useRedux'
import { useRouter } from 'next/router'
import { googleActivation } from './store/google2fa'

export const TwoFaNotification: React.FC = () => {
  const { t } = useTranslation('notifications')
  const router = useRouter()
  const [, dispatch] = useRedux()

  const { user } = useAuth()

  const [open, setOpen] = useState<boolean | undefined>(!user?.isGoogle2FAEnabled)

  const handleOnClick = () => {
    router.push(ROUTES.CABINET_SECURITY)
    dispatch(googleActivation())
  }

  if (!open) return null

  return (
    <Message
      title={t('twoFaNotification.verification-required')}
      description={t('twoFaNotification.verification-message')}
      size="micro"
      theme="warning"
      closeSize="small"
      additionalButton={
        <Button
          onClick={handleOnClick}
          label={t('twoFaNotification.verification-link')}
          underline
          shape="text"
          theme="nav-underline"
          color="text-blue"
        />
      }
      onClose={() => {
        setOpen(false)
      }}
    />
  )
}
