import useTranslation from 'next-translate/useTranslation'
import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { Header } from '@/components/tables/ResponsiveTable/types'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { PriceChange } from '@/components/PriceChange'
import { CurrencyItem } from '@/components/CurrencyItem'
import btc from '../../../../../public/img/btc.png'
import { mockedMarketData } from '../../mockedData'

type TMarketTable = {
  data: typeof mockedMarketData
}

export const MarketTable: React.FC<TMarketTable> = ({ data }) => {
  const { t } = useTranslation('market')

  const headerData: Header = [
    {
      value: 'isFavorite',
      label: '',
      notHidden: true
    },
    {
      value: 'title',
      label: t('table-headers.pairs')
    },
    {
      value: 'name',
      label: t('table-headers.name')
    },
    {
      value: 'last_price',
      label: t('table-headers.price')
    },
    {
      value: 'volume_24',
      label: t('table-headers.volume')
    },
    {
      value: 'change_24',
      label: t('table-headers.daily-change')
    },
    {
      value: 'openInterest',
      label: t('table-headers.open-interest')
    }
  ]

  const handleClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }

  const tableData = data.map((item) => ({
    ...item,
    id: item.pair_id,
    isFavorite: (
      <ButtonIcon
        type="button"
        icon="star"
        iconColor={item.isFavorite ? 'alert' : 'none'}
        fill={item.isFavorite ? 'alert' : 'none'}
        onClick={() => handleClick(item.pair_id)}
      />
    ),
    title: <CurrencyItem img={btc.src} text={item.title} alt="currency" />,
    change_24: <PriceChange value={item.change_24} />
  }))

  return (
    <ResponsiveTable
      header={headerData}
      data={tableData}
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
