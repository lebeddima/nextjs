import { CSSProperties } from 'react'
import s from './TableWrapper.module.scss'

type TTableWrapper = {
  style?: CSSProperties
}

export const TableWrapper: React.FC<TTableWrapper> = ({ children, style }) => (
  <div className={s.container} style={style}>
    {children}
  </div>
)
