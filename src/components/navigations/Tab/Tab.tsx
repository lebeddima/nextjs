import React, { useState, CSSProperties } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import s from './Tab.module.scss'

type TTab = {
  widthButton?: string
  widthContainer?: string
  notActive?: boolean
  defaultTab: string
  styleContainer?: CSSProperties
}

export const Tab: React.FC<TTab> = ({
  children,
  widthContainer,
  widthButton,
  notActive,
  defaultTab,
  styleContainer
}) => {
  const [active, setActive] = useState<string | undefined>(defaultTab)

  const clickTabHandl = (id: string) => {
    if (id === active || notActive) return
    setActive(id)
  }

  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { id } = child.props

      return (
        <div
          onClick={() => clickTabHandl(id)}
          role="button"
          tabIndex={0}
          onKeyPress={() => clickTabHandl(id)}
          className={s.buttonCont}
          style={{ width: widthButton }}
        >
          {React.cloneElement(child, {
            additionalState: id === active,
            notActive: id === active || notActive,
            width: widthButton && '100%'
          })}
        </div>
      )
    }
    return child
  })

  return (
    <ScrollContainer className={s.scroll}>
      <div className={s.container} style={{ width: widthContainer, ...styleContainer }}>
        {newChildren}
      </div>
    </ScrollContainer>
  )
}
