import React from 'react'
import type { NextPage } from 'next'
import { Breadcrumbs, TBreadcrumbs } from '@/components/navigations/Breadcrumbs'
import s from './PageHeader.module.scss'

type TPageHeader = {
  breadcrumbs: TBreadcrumbs['list']
  title: string
}

export const PageHeader: NextPage<TPageHeader> = ({ breadcrumbs, title }) => (
  <div className={s.container}>
    <Breadcrumbs list={breadcrumbs} />
    <h1 className={s.title}>{title}</h1>
  </div>
)
