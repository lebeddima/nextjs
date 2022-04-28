export type Header = { value: string; label: string; notHidden?: boolean }[]
export type Data = {
  [key: string]: string | number | React.ReactNode | ((item: Data[0]) => React.ReactNode)
}[]

export type HiddenCellType = number
export type HiddenCellActionType = React.Dispatch<React.SetStateAction<HiddenCellType>>
export type TableResizeType = {
  width: number
  hiddenCellResize: number
  phase: string | null
}
export type TableResizeActionType =
  | { type: 'setWidth'; payload: TableResizeType['width'] }
  | { type: 'reset' }
  | { type: 'decrease'; payload: { width: TableResizeType['width'] } }

type TFont = 'captions-1' | 'text-small' | 'captions-2' | 'button-small' | 'text-big'

export type TableProps = {
  data: Data
  header: Header
  loading?: boolean
  fallback?: React.ReactNode
  transparent?: boolean
  stickyAround?: boolean
  cellStyles?: { [key: string]: string }
  cellHeaderStyles?: { [key: string]: string }
  collapseCellStyles?: { [key: string]: string }
  fontHeader?: TFont
  fontCell?: TFont
}
