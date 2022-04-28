import BarLoader from 'react-spinners/BarLoader'
import cn from 'classnames'
import s from './InlineLoader.module.scss'

interface IInlineLoader {
  isLoading?: boolean
  width: number | string
  height: number | string
  color?: string
  radius?: string
}

export const InlineLoader: React.FC<IInlineLoader> = ({
  isLoading,
  width,
  height,
  color = 'blue',
  radius = 'rounded'
}) => {
  if (!isLoading) return null

  return (
    <div
      className={cn(s.container, {
        [s[`color-theme_${color}`]]: color,
        [s[`radius_${radius}`]]: radius
      })}
    >
      <BarLoader loading={isLoading} width={width} height={height} />
    </div>
  )
}
