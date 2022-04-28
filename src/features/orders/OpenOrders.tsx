import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { Pagination } from '@/components/navigations/Pagination'
import { Header } from '@/components/tables/ResponsiveTable/types'
import { TableWrapper } from '@/components/tables/TableWrapper'
import { ConfirmModal } from '@/components/modals/ConfirmModal/ConfirmModal'
import { Fallback } from '@/components/Fallback'
import { IOpenOrder } from './types/open-order'
import s from './styles/OpenOrders.module.scss'

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

export const OpenOrders: React.FC = () => {
  const { t } = useTranslation('open-orders')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleCloseModal = () => {
    setConfirmOpen(false)
  }

  const headerData: Header = [
    {
      value: 'time',
      label: t('common:time')
    },
    {
      value: 'pair',
      label: t('common:pair')
    },
    {
      value: 'account',
      label: t('common:account')
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
      value: 'fee',
      label: t('common:fee')
    },
    {
      value: 'volume',
      label: t('common:volume')
    },
    {
      value: 'filled',
      label: t('common:filled')
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
    time: x.time.toLocaleString(),
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
      <div className={s.container}>
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
        <TableWrapper>
          <ResponsiveTable
            header={headerData}
            data={tableData}
            loading
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
        </TableWrapper>
        <TableWrapper style={{ marginTop: '32px' }}>
          <ResponsiveTable
            header={headerData}
            data={[]}
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
        </TableWrapper>
        <Pagination currentPage={2} lastPage={7} />
      </div>
    </>
  )
}
