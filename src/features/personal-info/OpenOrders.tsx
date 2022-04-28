import React from 'react'
import { OpenOrdersShort } from '@/features/orders/OpenOrdersShort'
import { Button } from '@/components/buttons/Button'
import { ROUTES } from '@/constants/routes'
import useTranslation from 'next-translate/useTranslation'
import { Card } from './components/Card'

export const OpenOrders: React.FC = () => {
  const { t } = useTranslation('personal-info')
  return (
    <Card
      title={t('openedOrders')}
      navigation={
        <Button
          label={t('common:seeAll')}
          theme="text-blue"
          underline
          linkTo={ROUTES.CABINET_OPEN_ORDERS}
        />
      }
    >
      <OpenOrdersShort />
    </Card>
  )
}
