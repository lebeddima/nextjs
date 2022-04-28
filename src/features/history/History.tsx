import React from 'react'
import { TableWrapper } from '@/components/tables/TableWrapper'
import { Pagination } from '@/components/navigations/Pagination'
import { selectHistory } from '@/features/history/store/history'
import { useRedux } from '@/hooks/useRedux'
import { Loader } from '@/components/loaders/Loader'
import s from './styles/History.module.scss'
import { HistoryTable } from './components/HistoryTable'

export const History: React.FC = () => {
  const [select] = useRedux()
  const { historyData, fetching } = select(selectHistory)

  if (fetching) return <Loader />

  return (
    <div className={s.container}>
      <TableWrapper>
        <HistoryTable data={historyData} />
      </TableWrapper>
      <Pagination currentPage={1} lastPage={2} />
    </div>
  )
}
