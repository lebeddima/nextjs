import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { Header } from '@/components/tables/ResponsiveTable/types'
import useTranslation from 'next-translate/useTranslation'
import { ROUTES } from '@/constants/routes'
import { IWallet } from '@/requests/wallet'
import { CurrencyItem } from '@/components/CurrencyItem'
import { ActionButtons } from '../ActionButtons'
import btc from '../../../../../public/img/btc.png'

interface IWalletProps {
  userConfirmed: boolean
  is2FaEnabled: boolean
  loading: boolean
  data: IWallet[]
}

export const WalletTable: React.FC<IWalletProps> = ({
  userConfirmed,
  is2FaEnabled,
  loading,
  data
}) => {
  const { t } = useTranslation('wallet')

  const headerData: Header = [
    {
      value: 'currency',
      label: t('common:currency')
    },
    {
      value: 'availableBalance',
      label: t('availableBalance')
    },
    {
      value: 'holdenBalance',
      label: t('holdenBalance')
    },
    {
      value: 'total',
      label: t('totalBalance')
    },
    {
      value: 'actions',
      label: t('common:actions'),
      notHidden: true
    }
  ]

  const tableData = data.map((item) => ({
    ...item,
    id: item._id,
    currency: (
      <CurrencyItem
        img={btc.src}
        text={item.assetInfo.name}
        additionalText={`(${item.assetInfo.code})`}
        alt="currency"
      />
    ),
    actions: (
      <ActionButtons
        linkWith={ROUTES.WITHDRAW_CRYPTO}
        linkDepos={ROUTES.DEPOSIT_CRYPTO}
        disabledWith={!userConfirmed || !is2FaEnabled || !item.assetInfo.isAbleForDeposit}
        disabledDepos={
          !userConfirmed || !is2FaEnabled || !item.assetInfo.isAbleForWithdrawal
        }
      />
    )
  }))

  return (
    <ResponsiveTable
      header={headerData}
      data={tableData}
      loading={loading}
      stickyAround
      transparent
      fontHeader="button-small"
      fontCell="text-big"
      cellHeaderStyles={{ textTransform: 'capitalize' }}
      cellStyles={{
        height: '55px'
      }}
    />
  )
}
