import useTranslation from 'next-translate/useTranslation'
import cn from 'classnames'
import { format } from 'date-fns'
import { ResponsiveTable } from '@/components/tables/ResponsiveTable'
import { Header } from '@/components/tables/ResponsiveTable/types'
import { getSideColor, getStatusColor } from '@/features/history/utils/getTextColor'
import { DATE_FORMATS, TIME_FORMATS } from '@/constants/date'
import s from './HistoryTable.module.scss'
import { mockedHistoryData } from '../../mockedData'

type THistoryTable = {
  data: typeof mockedHistoryData
}

export const HistoryTable: React.FC<THistoryTable> = ({ data }) => {
  const { lang, t } = useTranslation('history')

  const headerData: Header = [
    {
      value: 'time',
      label: t('table-headers.time')
    },
    {
      value: 'pair',
      label: t('table-headers.pair')
    },
    {
      value: 'account',
      label: t('table-headers.account')
    },
    {
      value: 'type',
      label: t('table-headers.type')
    },
    {
      value: 'side',
      label: t('table-headers.side')
    },
    {
      value: 'price',
      label: t('table-headers.price')
    },
    {
      value: 'fee',
      label: t('table-headers.fee')
    },
    {
      value: 'volume',
      label: t('table-headers.volume')
    },
    {
      value: 'filled',
      label: t('table-headers.filled')
    },
    {
      value: 'total',
      label: t('table-headers.total')
    },
    {
      value: 'status',
      label: t('table-headers.status')
    }
  ]

  const tableData = data.map((item) => ({
    ...item,
    time: (
      <div className={s.time}>
        <span> {format(item.time * 1000, DATE_FORMATS[lang])}</span>
        <span>{format(item.time * 1000, TIME_FORMATS[lang])}</span>
      </div>
    ),
    side: <span className={cn(s.side, s[getSideColor(item.side)])}>{item.side}</span>,
    status: (
      <span className={cn(s.status, s[getStatusColor(item.status)])}>{item.status}</span>
    )
  }))

  return (
    <ResponsiveTable
      header={headerData}
      data={tableData}
      stickyAround
      transparent
      fontHeader="captions-1"
      fontCell="text-small"
      cellHeaderStyles={{ textTransform: 'uppercase' }}
      cellStyles={{
        height: '55px'
      }}
    />
  )
}
