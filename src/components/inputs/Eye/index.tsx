import cl from 'classnames'
import { Icon } from '@/components/Icon'
import s from './Eye.module.scss'

type Eye = {
  open?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Eye: React.FC<Eye> = ({ open = false, disabled = false, onClick }) => (
  <div
    className={cl([s.container], { [s.disabled]: disabled })}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    {open ? <Icon id="eyeSlash" /> : <Icon id="eye" />}
  </div>
)
