import React from 'react'
import { Resize } from './Resize'
import { Table } from './Table'
import { Provider } from './Context'
import { TableProps } from './types'

type TableResponsive = TableProps & {
  resetOnChange?: boolean
}

const TableResponsive: React.FC<TableResponsive> = ({
  header,
  data,
  resetOnChange,
  ...props
}) => {
  const columnsLength = Object.keys(header).length

  return (
    <Provider>
      <Resize columnsLength={columnsLength} data={data} resetOnChange={resetOnChange}>
        <Table data={data} header={header} {...props} />
      </Resize>
    </Provider>
  )
}

export const ResponsiveTable = React.memo(TableResponsive)
