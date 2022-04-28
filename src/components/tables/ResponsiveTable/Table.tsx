import React, { Fragment, useState } from 'react'

import { Collapse } from 'react-collapse'
import cn from 'classnames'
import { ArrowFolding } from '@/components/buttons/ArrowFolding'
import { InlineLoader } from '@/components/loaders/InlineLoader'
import { useHiddenCellState } from './Context'
import { separateColumns } from './separateColumns'
import s from './styles/Table.module.scss'
import { TableProps, Data } from './types'

const TableComponent: React.FC<TableProps> = ({
  data,
  header,
  cellStyles,
  cellHeaderStyles,
  stickyAround,
  collapseCellStyles,
  fallback,
  loading,
  transparent = false,
  fontHeader = 'captions-1',
  fontCell = 'text-small'
}) => {
  const hiddenCell = useHiddenCellState()

  const [open, setOpen] = useState<(string | number)[]>([])

  const { tableColumns, collapseColumns } = separateColumns({ hiddenCell, header })

  const isEmpty = data.length === 0
  const shouldRenderFallback = isEmpty && !!fallback

  const isSticky = (index: number) => {
    if (!stickyAround) {
      return false
    }
    if (index === tableColumns.length - 1) {
      return 'right'
    }
    if (index === 0) {
      return 'left'
    }
  }

  const onClickFolding = (id: string) => {
    if (typeof id !== 'string') return
    if (open.includes(id)) {
      setOpen(open.filter((item) => item !== id))
      return
    }
    setOpen([...open, id])
  }

  // RENDER-HEADER
  const renderHeader = () => (
    <>
      {collapseColumns.length !== 0 && (
        <div style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }} />
      )}
      {tableColumns.map((headerItem, cellIndex) => {
        const cellShiftIndex = collapseColumns.length === 0 ? cellIndex : cellIndex + 1
        const hasSticky = isSticky(cellIndex)

        return (
          <div
            key={headerItem.value}
            className={cn(s.headerCell, { [s[`sticky-${hasSticky}`]]: hasSticky })}
            style={{
              ...cellHeaderStyles,
              gridColumn: `${cellShiftIndex + 1} / ${cellShiftIndex + 2}`,
              gridRow: '1 / 2'
            }}
          >
            {headerItem.label}
          </div>
        )
      })}
    </>
  )
  // RENDER-HEADER-END

  // RENDER-ARROW
  const renderArrow = (rowIndex: number, dataItem: Data[0], index: number) => {
    const isOpen = open.includes(`${dataItem.id}`)
    const cellColor = index % 2 === 0 ? 'var(--background)' : 'var(--white)'
    return (
      <div
        className={cn(s.cell, {
          [s.borderTopLeft]: hiddenCell !== 0,
          [s.borderBottomLeft]: hiddenCell !== 0 && !isOpen
        })}
        style={{
          gridColumn: '1 / 2',
          gridRow: `${rowIndex} / ${rowIndex + 1}`,
          paddingLeft: stickyAround ? '8px' : '',
          background: transparent ? undefined : cellColor,
          ...cellStyles
        }}
      >
        <ArrowFolding
          onClick={() => onClickFolding(`${dataItem.id}`)}
          open={open.includes(`${dataItem.id}`)}
          active
        />
      </div>
    )
  }
  // RENDER-ARROW-END

  // RENDER-ROW
  const renderRow = (rowIndex: number, dataItem: Data[0], index: number) => {
    const cellColor = index % 2 === 0 ? 'var(--background)' : 'var(--white)'

    return (
      <>
        {collapseColumns.length !== 0 && renderArrow(rowIndex, dataItem, index)}
        {tableColumns.map((headerItem, cellIndex) => {
          const isOpen = open.includes(`${dataItem.id}`)
          const cellShiftIndex = collapseColumns.length === 0 ? cellIndex : cellIndex + 1
          const hasSticky = isSticky(cellIndex)

          return (
            <div
              key={`${dataItem.id}${headerItem.value}`}
              className={cn(s.cell, {
                [s.borderTopLeft]: !transparent && cellIndex === 0 && !hiddenCell,
                [s.borderTopRight]: !transparent && cellIndex === tableColumns.length - 1,
                [s.borderBottomLeft]:
                  !transparent && cellIndex === 0 && !isOpen && !hiddenCell,
                [s.borderBottomRight]:
                  !transparent && cellIndex === tableColumns.length - 1 && !isOpen,
                [s[`sticky-${hasSticky}`]]: hasSticky
              })}
              style={{
                gridColumn: `${cellShiftIndex + 1} / ${cellShiftIndex + 2}`,
                gridRow: `${rowIndex} / ${rowIndex + 1}`,
                background: transparent ? undefined : cellColor,
                ...cellStyles
              }}
            >
              {dataItem[headerItem.value]}
            </div>
          )
        })}
      </>
    )
  }
  // RENDER-ROW-END

  // RENDER-COLLAPSE
  const renderCollapse = (rowIndex: number, dataItem: Data[0], index: number) => {
    const backgroundColor = index % 2 === 0 ? 'var(--background)' : 'var(--white)'

    return (
      <div
        style={{
          gridColumn: `1 / ${tableColumns.length + 2}`,
          gridRow: `${rowIndex + 1} / ${rowIndex + 2}`
        }}
      >
        <Collapse isOpened={open.includes(`${dataItem.id}`)}>
          {collapseColumns.map((itemHeader) => {
            const isExist = data.find((itemData) => itemData[itemHeader.value])
            if (!isExist) return false

            return (
              <div
                className={s.collapseRow}
                key={itemHeader.value}
                style={{
                  gridColumn: `1 / ${tableColumns.length + 2}`,
                  gridRow: `${rowIndex + 1} / ${rowIndex + 2}`,
                  background: transparent ? undefined : backgroundColor,
                  ...collapseCellStyles
                }}
              >
                <div className={s.collapseCell}>{`${itemHeader.label}:`}</div>
                <div className={s.collapseCell}>{dataItem[itemHeader.value]}</div>
              </div>
            )
          })}
        </Collapse>
      </div>
    )
  }
  // RENDER-COLLAPSE-END

  const renderData = () =>
    data.map((dataItem, index) => {
      const rowIndex = collapseColumns.length === 0 ? index + 1 : (index + 1) * 2

      return (
        <Fragment key={`${dataItem.id}`}>
          {renderRow(rowIndex + 1, dataItem, index)}
          {collapseColumns.length !== 0 && renderCollapse(rowIndex + 1, dataItem, index)}
        </Fragment>
      )
    })

  return (
    <div className={s.container}>
      <div
        className={cn(
          s.table,
          [s[`font-header_${fontHeader}`]],
          [s[`font-cell_${fontCell}`]],
          {
            [s.transparent]: transparent
          }
        )}
        style={{
          gridTemplateColumns: `${collapseColumns.length === 0 ? '' : '35px'} repeat(${
            tableColumns.length
          }, auto)`
        }}
      >
        {renderHeader()}

        {!shouldRenderFallback && renderData()}
      </div>
      <InlineLoader isLoading={loading} width="100%" height={4} />
      {shouldRenderFallback && fallback}
    </div>
  )
}

export const Table = React.memo(TableComponent)
