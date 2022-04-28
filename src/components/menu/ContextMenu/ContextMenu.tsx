import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupProps } from 'reactjs-popup/dist/types'
import s from './ContextMenu.module.scss'

interface IContextMenuProps extends PopupProps {
  notActive?: boolean
}

export const ContextMenu: React.FC<IContextMenuProps> = ({
  trigger,
  children,
  position = 'bottom center',
  offsetX,
  offsetY,
  contentStyle,
  notActive
}) => {
  const [active, setActive] = useState(0)

  const clickMenuItem = (i: number) => {
    if (i === active || notActive) return
    setActive(i)
  }

  const childrenWithClick = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return (
        <div
          onClick={() => clickMenuItem(i)}
          role="button"
          tabIndex={0}
          onKeyPress={() => clickMenuItem(i)}
          className={s.menuItem}
        >
          {React.cloneElement(child, {
            additionalState: i === active,
            notActive: i === active || notActive
          })}
        </div>
      )
    }
    return child
  })

  return (
    <Popup
      trigger={trigger}
      position={position}
      offsetX={offsetX}
      offsetY={offsetY}
      contentStyle={contentStyle}
    >
      {(close: () => React.MouseEventHandler<HTMLDivElement> | undefined) => (
        <div
          role="menu"
          tabIndex={0}
          onClick={close}
          onKeyPress={close}
          className={s.menuBody}
        >
          {childrenWithClick}
        </div>
      )}
    </Popup>
  )
}
