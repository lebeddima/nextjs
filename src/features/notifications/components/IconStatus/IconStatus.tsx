import { useMemo } from 'react'
import { Icon, TIconProps } from '@/components/Icon'
import { IconWrapper, TIconWrapper } from '@/components/IconWrapper'
import { TNotification } from '../../store/notifications'

type TIconStatus = {
  type: TNotification['type']
}

type TIconData = { color: TIconWrapper['colorTheme']; id: TIconProps['id'] }

export const IconStatus: React.FC<TIconStatus> = ({ type }) => {
  const iconData = useMemo<TIconData>(() => {
    switch (type) {
      case 'error':
        return { color: 'red', id: 'x-circle' }
      case 'success':
        return { color: 'green', id: 'check-circle' }
      case 'warning':
        return { color: 'blue', id: 'x-circle' }
      default:
        return { color: 'green', id: 'check-circle' }
    }
  }, [type])

  return (
    <IconWrapper
      colorTheme={iconData.color}
      width={32}
      borderRadius={6}
      shape="rectangle"
    >
      <Icon id={iconData.id} />
    </IconWrapper>
  )
}
