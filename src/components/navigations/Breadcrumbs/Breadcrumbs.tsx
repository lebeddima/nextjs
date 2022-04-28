import Link from 'next/link'
import s from './Breadcrumbs.module.scss'

export type TBreadcrumbs = {
  list: {
    label: string
    link?: string
  }[]
}

export const Breadcrumbs: React.FC<TBreadcrumbs> = ({ list }) => (
  <nav className={s.container}>
    {list.map((item, index) => (
      <div key={item.label} className={s.linkCont}>
        {index !== list.length - 1 && item.link && (
          <Link href={item.link}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={s.link}>{item.label}</a>
          </Link>
        )}
        {index === list.length - 1 && <span className={s.link}>{item.label}</span>}
      </div>
    ))}
  </nav>
)
