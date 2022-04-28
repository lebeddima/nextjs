import { useEffect } from 'react'
import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { Header } from '@/components/tables/ResponsiveTable/types'
import useTranslation from 'next-translate/useTranslation'
import { getWallet, selectWallet } from '@/features/wallet/store/wallet'
import { useRedux } from '@/hooks/useRedux'
import { Loader } from '@/components/loaders/Loader'

export const WalletShort: React.FC = () => {
  const [select, dispatch] = useRedux()
  const { fetching, walletData } = select(selectWallet)
  const { t } = useTranslation('common')

  useEffect(() => {
    dispatch(getWallet())
  }, [])

  const headerData: Header = [
    {
      value: 'currency',
      label: t('currency')
    },
    {
      value: 'total',
      label: t('total')
    },
    {
      value: 'availableBalance',
      label: t('available')
    },
    {
      value: 'holdenBalance',
      label: t('holden')
    }
  ]

  if (!walletData) return <Loader />

  const tableData = walletData.slice(0, 4).map((x) => ({
    ...x,
    id: x._id,
    currency: x.assetInfo.name
  }))

  return (
    <ResponsiveTable
      header={headerData}
      data={tableData}
      loading={fetching}
      stickyAround
    />
  )
}
