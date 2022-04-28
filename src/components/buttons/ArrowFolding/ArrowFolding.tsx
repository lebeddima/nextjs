import cn from 'classnames'
import { Icon } from '@/components/Icon'
import s from './ArrowFolding.module.scss'

type TArrowFolding = {
  id?: string | number
  active?: boolean
  onClick: (id: string | number) => void
  open: boolean
}

export const ArrowFolding: React.FC<TArrowFolding> = ({
  active,
  id = '',
  onClick,
  open
}) => (
  <div
    role="button"
    className={cn(s.container, { [s.active]: active, [s.open]: open })}
    onClick={() => onClick(id)}
    onKeyPress={() => onClick(id)}
    tabIndex={0}
  >
    <Icon id="chevron-left" />
  </div>
)
