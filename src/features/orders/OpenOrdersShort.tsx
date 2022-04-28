import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { Header } from '@/components/tables/ResponsiveTable/types'
import { ConfirmModal } from '@/components/modals/ConfirmModal/ConfirmModal'
import s from '@/features/orders/styles/OpenOrders.module.scss'
import { Fallback } from '@/components/Fallback'
import { IOpenOrder } from './types/open-order'

const orders: IOpenOrder[] = [
  {
    account: 'lana@gmail.com',
    time: new Date(2021, 11, 20, 14, 44, 58),
    pair: 'BTC/USDT',
    type: 'market',
    side: true,
    price: 66999.5,
    fee: 66999.5,
    volume: 66999.5,
    filled: 66999.5,
    total: 66999.5,
    id: '1'
  },
  {
    account: 'lana@gmail.com',
    time: new Date(2021, 11, 20, 14, 44, 58),
    pair: 'BTC/USDT',
    type: 'market',
    side: false,
    price: 66999.5,
    fee: 66999.5,
    volume: 66999.5,
    filled: 66999.5,
    total: 66999.5,
    id: '2'
  }
]

export const OpenOrdersShort: React.FC = () => {
  const { t } = useTranslation('open-orders')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleCloseModal = () => {
    setConfirmOpen(false)
  }

  const headerData: Header = [
    {
      value: 'pair',
      label: t('common:pair')
    },

    {
      value: 'type',
      label: t('common:type')
    },
    {
      value: 'side',
      label: t('common:side')
    },
    {
      value: 'price',
      label: t('common:price')
    },

    {
      value: 'volume',
      label: t('common:volume')
    },
    {
      value: 'total',
      label: t('common:total')
    },
    {
      value: 'cancel',
      label: t('common:cancel'),
      notHidden: true
    }
  ]

  const tableData = orders.map((x) => ({
    ...x,
    side: x.side ? (
      <span className={s.sell}>Sell</span>
    ) : (
      <span className={s.buy}>Buy</span>
    ),
    cancel: (
      <ButtonIcon
        theme="small"
        icon="trash-full"
        iconColor="none"
        styleContainer={{ marginRight: '16px' }}
        onClick={() => {
          setConfirmOpen(true)
        }}
      />
    )
  }))

  return (
    <>
      {confirmOpen && (
        <ConfirmModal
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
          onConfirm={handleCloseModal}
          title={t('deleteConfirm.title')}
          description={t('deleteConfirm.description')}
          labelConfirm={t('deleteConfirm.confirmButton')}
          labelCancel={t('deleteConfirm.cancelButton')}
        />
      )}
      <ResponsiveTable
        header={headerData}
        data={tableData}
        stickyAround
        fallback={
          <Fallback
            title={t('fallback-title')}
            buttonLabel={t('create-order')}
            onClick={() => {
              //
            }}
          />
        }
      />
    </>
  )
}
