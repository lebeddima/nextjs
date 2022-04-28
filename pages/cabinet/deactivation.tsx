import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import useTranslation from 'next-translate/useTranslation'
import { Deactivation } from '@/features/deactivation/Deactivation'
import { Modals } from '@/features/deactivation/Modals'

const PersonalInfo: NextPage = () => {
  const { t } = useTranslation('deactivation')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title">{t('header')}</h4>
      <Deactivation />
      <Modals />
    </LayoutCabinet>
  )
}

export default PersonalInfo
