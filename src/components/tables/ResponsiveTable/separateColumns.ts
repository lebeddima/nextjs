import { Header } from './types'

type Props = {
  hiddenCell: number
  header: Header
}

type SeparateColumns = (props: Props) => {
  tableColumns: Header
  collapseColumns: Header
}

export const separateColumns: SeparateColumns = ({ hiddenCell, header }) => {
  let hidden = hiddenCell
  const tableColumns: Header = []
  const collapseColumns: Header = []

  for (let i = header.length - 1; i >= 0; i -= 1) {
    if (hidden && !header[i].notHidden) {
      hidden -= 1
      collapseColumns.push(header[i])
    } else {
      tableColumns.push(header[i])
    }
  }
  return {
    tableColumns: tableColumns.reverse(),
    collapseColumns: collapseColumns.reverse()
  }
}
