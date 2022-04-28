import { Icon, TIconProps } from '@/components/Icon'
import cn from 'classnames'
import s from './loader.module.scss'

type TLoaderType = {
  size?: TIconProps['size']
  colorStroke?: TIconProps['colorStroke']
  bgColor?: 'transparent' | 'background'
  fixed?: boolean
}

export const Loader: React.FC<TLoaderType> = ({
  size = 'extra-big',
  bgColor,
  colorStroke = 'blue',
  fixed
}) => (
  <div
    className={cn(s.container, { [s.fixed]: fixed })}
    style={{ ...(bgColor && { backgroundColor: `var(--${bgColor})` }) }}
  >
    <div className={s.loader}>
      <Icon
        className={s.loadingIcon}
        id="spinner-gap"
        size={size}
        spin
        colorStroke={colorStroke}
      />
    </div>
  </div>
)
