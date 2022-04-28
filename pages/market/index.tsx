import useTranslation from 'next-translate/useTranslation'
import { LayoutPublic } from '@/layouts/LayoutPublic'
import { Market } from '@/features/market/Market'
import { CurrencyCardsBlock } from '@/features/market/CurrencyCardsBlock'

const MarketPage: React.FC = () => {
  const { t } = useTranslation('market')

  return (
    <LayoutPublic width100 verticalPadding={false}>
      <CurrencyCardsBlock />
      <h4 className="cabinet-title"> {t('header')} </h4>
      <Market />
    </LayoutPublic>
  )
}

export default MarketPage
