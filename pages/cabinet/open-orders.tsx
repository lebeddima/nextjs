import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import useTranslation from 'next-translate/useTranslation'
import { OpenOrders } from '@/features/orders/OpenOrders'

const PersonalInfo: NextPage = () => {
  const { t } = useTranslation('open-orders')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title "> {t('header')}</h4>
      <OpenOrders />
    </LayoutCabinet>
  )
}

export default PersonalInfo
