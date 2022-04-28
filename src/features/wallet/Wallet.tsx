import { useEffect } from 'react'
import { TableWrapper } from '@/components/tables/TableWrapper'
import { Tab } from '@/components/navigations/Tab'
import { Button } from '@/components/buttons/Button'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/useRedux'
import { TWalletTab } from '@/types/global'
import { useAuth } from '@/hooks/useAuth'
import { Loader } from '@/components/loaders/Loader'
import { WalletTable } from './components/WalletTable'
import { getWallet, selectWalletData, selectWallet, setWalletTab } from './store/wallet'

export const Wallet: React.FC = () => {
  const { t } = useTranslation('common')
  const [select, dispatch] = useRedux()
  const { fetching, walletTab } = select(selectWallet)
  const walletData = select(selectWalletData)

  useEffect(() => {
    dispatch(getWallet())
  }, [])

  const { user } = useAuth()

  const handleSetWalletTab = (tab: TWalletTab) => dispatch(setWalletTab(tab))

  if (!walletData || !user) return <Loader />

  return (
    <TableWrapper>
      <Tab
        defaultTab={walletTab}
        widthButton="200px"
        styleContainer={{ marginBottom: '10px' }}
      >
        <Button
          id="CRYPTO"
          theme="tab-blue-small"
          label={t('common:crypto')}
          onClick={() => handleSetWalletTab('CRYPTO')}
        />
        <Button
          id="FIAT"
          theme="tab-blue-small"
          label={t('common:fiat')}
          onClick={() => handleSetWalletTab('FIAT')}
        />
      </Tab>
      <WalletTable
        userConfirmed
        is2FaEnabled={user.isGoogle2FAEnabled}
        loading={fetching}
        data={walletData}
      />
    </TableWrapper>
  )
}
