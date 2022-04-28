import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import { Security } from '@/features/security/Security'
import useTranslation from 'next-translate/useTranslation'
import { ChangePass } from '@/features/security/ChangePass'
import { Google2fa } from '@/features/security/Google2fa'
import { ChangeEmail } from '@/features/security/ChangeEmail'
import { ChangePhone } from '@/features/security/ChangePhone'

const SecurityPage: NextPage = () => {
  const { t } = useTranslation('security')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title ">{t('header')}</h4>
      <Security />
      <ChangeEmail />
      <ChangePass />
      <Google2fa />
      <ChangePhone />
    </LayoutCabinet>
  )
}

export default SecurityPage
