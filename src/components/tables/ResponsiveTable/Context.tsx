/* eslint-disable react/destructuring-assignment */
import React, { createContext, useContext, useReducer, useState } from 'react'
import {
  HiddenCellType,
  HiddenCellActionType,
  TableResizeType,
  TableResizeActionType
} from './types'

// REDUCERS
const tableResizeDefault = {
  width: 0,
  hiddenCellResize: 0,
  phase: 'init'
}
const TableResizeReducer = (state: TableResizeType, action: TableResizeActionType) => {
  switch (action.type) {
    case 'setWidth':
      return {
        ...state,
        width: action.payload,
        phase: null
      }
    case 'reset':
      return tableResizeDefault
    case 'decrease':
      return {
        ...state,
        width: action.payload.width,
        hiddenCellResize: state.hiddenCellResize + 1,
        phase: 'init'
      }
    default:
      return state
  }
}
// REDUCERS-END

// CONTEXT
const HiddenCellContext = createContext({} as HiddenCellType)
const HiddenCellActionContext = createContext({} as HiddenCellActionType)

const TableResizeContext = createContext({} as TableResizeType)
const TableResizeActionContext = createContext(
  {} as React.Dispatch<TableResizeActionType>
)
// CONTEXT-END

// HOOK
export const useHiddenCellState: () => number = () => useContext(HiddenCellContext)
export const useHiddenCellAction: () => HiddenCellActionType = () =>
  useContext(HiddenCellActionContext)

export const useTableResizeState: () => TableResizeType = () =>
  useContext(TableResizeContext)
export const useTableResizeAction: () => React.Dispatch<TableResizeActionType> = () =>
  useContext(TableResizeActionContext)
// HOOK-END

export const Provider: React.FC = ({ children }) => {
  const [hiddenCell, setHiddenCell] = useState<HiddenCellType>(0)
  const [tableResize, tableResizeDispatch] = useReducer(
    TableResizeReducer,
    tableResizeDefault
  )

  return (
    <HiddenCellContext.Provider value={hiddenCell}>
      <HiddenCellActionContext.Provider value={setHiddenCell}>
        <TableResizeContext.Provider value={tableResize}>
          <TableResizeActionContext.Provider value={tableResizeDispatch}>
            {children}
          </TableResizeActionContext.Provider>
        </TableResizeContext.Provider>
      </HiddenCellActionContext.Provider>
    </HiddenCellContext.Provider>
  )
}
