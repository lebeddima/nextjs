import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import s from './CollapseMenu.module.scss'

type TAccordion = {
  wrapper: React.ReactElement
  target: React.ReactElement
  folding: React.ReactElement
}

export const CollapseMenu: React.FC<TAccordion> = ({ wrapper, target, folding }) => {
  const [open, setIsOpen] = useState(false)

  const handlClick = () => {
    setIsOpen(!open)
  }

  return React.cloneElement(
    wrapper,
    {},
    <>
      {React.cloneElement(target, { isActive: open, onClick: handlClick })}
      <Collapse theme={{ collapse: s.collapse }} isOpened={open}>
        {folding}
      </Collapse>
    </>
  )
}
