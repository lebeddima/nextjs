/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from 'classnames'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import s from './Pagination.module.scss'

interface Pagination {
  currentPage: number
  lastPage: number
  link?: string
  theme?: 'default' | 'small'
  onClick?: (page: number) => void
  fetching?: boolean
}

type PaginationData = {
  currentPage: number
  pagesBefore: number[]
  pagesAfter: number[]
  firstPage?: number
  dotsBefore?: boolean
  dotsAfter?: boolean
  lastPage?: number
}

type PaginationDataProps = {
  currentPage: number
  lastPage: number
}

const getPaginationData = ({ currentPage, lastPage }: PaginationDataProps) => {
  const paginationData: PaginationData = {
    currentPage,
    pagesBefore: [],
    pagesAfter: []
  }

  if (currentPage > 3) {
    paginationData.firstPage = 1
  }

  if (currentPage > 4) {
    paginationData.dotsBefore = true
  }

  if (currentPage > 1) {
    const pagesBefore = []
    for (let i = 2; i > 0; i -= 1) {
      if (currentPage - i !== 0) {
        pagesBefore.push(currentPage - i)
      }
    }
    paginationData.pagesBefore = pagesBefore
  }

  if (lastPage - currentPage > 0) {
    const pagesAfter = []
    for (let i = 1; i < 3; i += 1) {
      if (currentPage + i > lastPage) {
        break
      }
      pagesAfter.push(currentPage + i)
    }
    paginationData.pagesAfter = pagesAfter
  }

  if (lastPage - currentPage > 3) {
    paginationData.dotsAfter = true
  }

  if (lastPage - currentPage > 2) {
    paginationData.lastPage = lastPage
  }

  return paginationData
}

export const Pagination: React.FC<Pagination> = ({
  currentPage,
  lastPage,
  link,
  theme = 'default',
  onClick,
  fetching
}) => {
  const paginationData = getPaginationData({ currentPage, lastPage })

  const renderButton = (page: number, className: string) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      className={cn(s.button, {
        [s.active]: page === currentPage,
        [s[className]]: className
      })}
      onClick={() => onClick && onClick(page)}
    >
      {link && (
        <Link href={link.replace('_id_', page.toString())} scroll={false}>
          <a>
            <span className={s.buttonText}>{page}</span>
          </a>
        </Link>
      )}
      {!link && (
        <button type="button">
          <span className={s.buttonText}>{page}</span>
        </button>
      )}
    </div>
  )

  const renderDots = () => (
    <div className={s.dots}>
      <span>...</span>
    </div>
  )

  const renderArrow = (direction?: 'next' | 'prev') => {
    const disabled =
      (direction === 'next' && currentPage === lastPage) ||
      (direction === 'prev' && currentPage === 1)

    const pageTo = direction === 'next' ? currentPage + 1 : currentPage - 1
    const ArrowIcon = (
      <Icon id={direction === 'next' ? 'chevron-right' : 'chevron-left'} />
    )

    return (
      <div className={cn(s.arrow, { [s.disabled]: disabled })}>
        {disabled && <div className={s.arrowLink}>{ArrowIcon}</div>}
        {!disabled && (
          <>
            {link && (
              <Link href={link.replace('_id_', pageTo.toString())}>
                <a className={s.arrowLink}>{ArrowIcon}</a>
              </Link>
            )}
            {!link && (
              <button
                onClick={() => {
                  if (!onClick) return
                  onClick(pageTo)
                }}
                type="button"
                className={s.arrowLink}
              >
                {ArrowIcon}
              </button>
            )}
          </>
        )}
      </div>
    )
  }

  if (lastPage === 1) return <></>

  return (
    <nav className={cn(s.container, s[theme], { [s.fetching]: fetching })}>
      {renderArrow('prev')}
      {paginationData.firstPage && renderButton(paginationData.firstPage, 'firstPage')}
      {paginationData.dotsBefore && renderDots()}
      {paginationData.pagesBefore[0] &&
        renderButton(paginationData.pagesBefore[0], 'pagesBefore')}
      {paginationData.pagesBefore[1] &&
        renderButton(paginationData.pagesBefore[1], 'pagesBefore')}
      {paginationData.currentPage &&
        renderButton(paginationData.currentPage, 'currentPage')}
      {paginationData.pagesAfter[0] &&
        renderButton(paginationData.pagesAfter[0], 'pagesAfter')}
      {paginationData.pagesAfter[1] &&
        renderButton(paginationData.pagesAfter[1], 'pagesAfter')}
      {paginationData.dotsAfter && renderDots()}
      {paginationData.lastPage && renderButton(paginationData.lastPage, 'lastPage')}
      {renderArrow('next')}
    </nav>
  )
}
