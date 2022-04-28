import useTranslation from 'next-translate/useTranslation'
import { TableWrapper } from '@/components/tables/TableWrapper'
import { Tab } from '@/components/navigations/Tab'
import { Button } from '@/components/buttons/Button'
import { useRedux } from '@/hooks/useRedux'
import { MarketTable } from './components/MarketTable'
import { selectMarketData, selectMarketTab, setMarketTab } from './store/market'
import { TMarketTab } from './types'

export const Market: React.FC = () => {
  const { t } = useTranslation('market')
  const [select, dispatch] = useRedux()
  const marketTab = select(selectMarketTab)
  const marketData = select(selectMarketData)

  const handleSetMarketTab = (tab: TMarketTab) => {
    dispatch(setMarketTab(tab))
  }

  return (
    <TableWrapper>
      <Tab
        defaultTab={marketTab}
        widthButton="200px"
        styleContainer={{ marginBottom: '10px' }}
      >
        <Button
          id="All"
          theme="tab-blue-small"
          label={t('tab-all')}
          onClick={() => handleSetMarketTab('All')}
        />
        <Button
          id="Favorites"
          theme="tab-blue-small"
          label={t('tab-favorites')}
          onClick={() => handleSetMarketTab('Favorites')}
        />
      </Tab>
      <MarketTable data={marketData} />
    </TableWrapper>
  )
}
