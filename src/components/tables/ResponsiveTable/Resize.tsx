import React, { useRef, useEffect, useState, forwardRef, RefObject } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { Data } from './types'
import {
  useTableResizeState,
  useTableResizeAction,
  useHiddenCellAction,
  useHiddenCellState
} from './Context'
import s from './styles/Resize.module.scss'

type PropTypesResizeDebounce = {
  onResize: () => void
  phase: string | null
  children: React.ReactNode
}

type PropTypesResize = {
  columnsLength: number
  data: Data
  resetOnChange?: boolean
}

// COMPONENT-RESIZE-DEBOUNCE
const ResizeDebounce = forwardRef<HTMLDivElement, PropTypesResizeDebounce>(
  ({ children, onResize, phase }, ref) => {
    const [lastWidth, setLastWidth] = useState<number | null>(null)

    const resizeHendler = (width?: number) => {
      if (!width) return

      if (lastWidth === null && phase !== 'init') {
        setLastWidth(width)
        return
      }
      if (lastWidth === width || width === 0) {
        return
      }

      setLastWidth(width)
      onResize()
    }

    return (
      <ReactResizeDetector
        handleWidth
        onResize={resizeHendler}
        refreshMode="debounce"
        refreshRate={100}
        targetRef={ref as RefObject<HTMLDivElement>}
      >
        {children}
      </ReactResizeDetector>
    )
  }
)

ResizeDebounce.displayName = 'ResizeDebounce'

// COMPONENT-RESIZE-DEBOUNCE-END

// COMPONENT-RESIZE
export const Resize: React.FC<PropTypesResize> = ({
  columnsLength,
  children,
  data,
  resetOnChange
}) => {
  const tableResizeState = useTableResizeState()
  const tableResizeAction = useTableResizeAction()
  const tableContainerRef = useRef<HTMLDivElement | null>(null)
  const tableElRef = useRef<HTMLDivElement | null>(null)
  const hiddenCellState = useHiddenCellState()
  const hiddenCellAction = useHiddenCellAction()
  // const template = useTemplateState()
  const { phase } = tableResizeState

  // GET-RESIZE-PHASE
  const getResizePhase = (width: number, tableFit: boolean) => {
    const { width: lastWidth } = tableResizeState

    if (!tableFit || lastWidth === 0) {
      return 'decrease'
    }
    if (lastWidth < width) {
      return 'increase'
    }
    return null
  }
  // GET-RESIZE-PHASE-END

  // GET-ELEMENTS-DIMENSIONS
  const getElemDimensions = () => {
    const tableContainerEl = tableContainerRef?.current
    const tableEl = tableElRef?.current
    if (!tableEl || !tableContainerEl) {
      return null
    }

    const tableContainerWidth = tableContainerEl.clientWidth
    const tableWidth = tableEl.clientWidth

    return { tableContainerWidth, tableWidth }
  }
  // GET-ELEMENTS-DIMENSIONS-END

  // RESIZE-HENDLER
  const resizeHendler = () => {
    const elemDimensions = getElemDimensions()
    if (!elemDimensions) {
      return
    }
    const { tableContainerWidth, tableWidth } = elemDimensions

    if (!columnsLength) {
      return
    }

    if (tableContainerWidth === 0) {
      return
    }

    const tableFit = tableWidth <= tableContainerWidth
    const resizePhase = getResizePhase(tableContainerWidth, tableFit)

    if (!resizePhase) {
      tableResizeAction({ type: 'setWidth', payload: tableContainerWidth })
      return
    }

    if (resizePhase === 'decrease') {
      if (tableFit) {
        tableResizeAction({ type: 'setWidth', payload: tableContainerWidth })
        return
      }

      if (hiddenCellState + 1 > columnsLength) {
        return
      }

      if (!tableFit) {
        tableResizeAction({ type: 'decrease', payload: { width: tableContainerWidth } })
        hiddenCellAction(hiddenCellState + 1)
        return
      }
    }

    if (resizePhase === 'increase') {
      if (hiddenCellState === 0) {
        return
      }
      tableResizeAction({ type: 'reset' })
      hiddenCellAction(0)
    }
  }
  // RESIZE-HENDLER-END

  useEffect(() => {
    if (phase !== 'init') {
      return
    }

    resizeHendler()
  }, [hiddenCellState])

  const onResizeTableContainer = () => {
    resizeHendler()
  }

  const onResizeTable = () => {
    const elemDimensions = getElemDimensions()

    if (!elemDimensions) {
      return
    }
    const { tableContainerWidth, tableWidth } = elemDimensions

    if (tableResizeState.width !== tableContainerWidth) {
      return
    }
    if (tableContainerWidth === tableWidth) {
      return
    }
    resizeHendler()
  }

  // then change data
  useEffect(() => {
    if (phase || !resetOnChange) return
    const elemDimensions = getElemDimensions()
    if (!elemDimensions) {
      return
    }
    const { tableContainerWidth, tableWidth } = elemDimensions
    if (tableContainerWidth < tableWidth) return
    hiddenCellAction(0)
  }, [data])

  const visibility =
    phase === 'init' && hiddenCellState !== columnsLength ? 'hidden' : 'visible'

  return (
    <ResizeDebounce
      onResize={onResizeTableContainer}
      phase={phase}
      ref={tableContainerRef}
    >
      <div className={s.container} ref={tableContainerRef} style={{ visibility }}>
        <ReactResizeDetector skipOnMount onResize={onResizeTable} targetRef={tableElRef}>
          <div className={s.tableContainer} ref={tableElRef}>
            {children}
          </div>
        </ReactResizeDetector>
      </div>
    </ResizeDebounce>
  )
}
// COMPONENT-RESIZE-END
