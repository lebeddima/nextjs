import { useEffect, useState, useRef, CSSProperties } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { ButtonIcon } from '@/components/buttons/ButtonIcon'
import { ECssSelectors } from '@/types/css-selectors'
import s from './ModalBase.module.scss'

type TModalBase = {
  theme?: 'default'
  onClose?: () => void
  style?: CSSProperties
  showHeader?: boolean
  maxWidth?: number
  borderRadius?: number
}

export const ModalBase: React.FC<TModalBase> = ({
  theme = 'default',
  onClose,
  children,
  style,
  showHeader,
  maxWidth,
  borderRadius
}) => {
  const [initPortal, setInitPortal] = useState(false)
  const scrollElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setInitPortal(true)
  }, [initPortal])

  if (!initPortal) return <></>

  return createPortal(
    <div className={cn(s.modal, { [s.showHeader]: showHeader })} style={{ ...style }}>
      <div
        className={cn(s[theme], s.baseBody)}
        style={{ maxWidth: `${maxWidth}px`, borderRadius: `${borderRadius}px` }}
        ref={scrollElement}
      >
        <div className={s.btnClose}>
          {onClose && (
            <ButtonIcon theme="medium" icon="x" onClick={onClose} iconColor="none" />
          )}
        </div>
        {children}
      </div>
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById(ECssSelectors.Portal)!
  )
}
