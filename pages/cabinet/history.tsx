import type { NextPage } from 'next'
import { LayoutCabinet } from '@/layouts/LayoutCabinet'
import useTranslation from 'next-translate/useTranslation'
import { History } from '@/features/history/History'

const HistoryPage: NextPage = () => {
  const { t } = useTranslation('history')

  return (
    <LayoutCabinet>
      <h4 className="cabinet-title ">{t('header')}</h4>
      <History />
    </LayoutCabinet>
  )
}

export default HistoryPage
