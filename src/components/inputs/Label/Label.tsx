import cls from 'classnames'
import { TLabelProps } from '../types'
import s from './label.module.scss'

const Label: React.FC<TLabelProps> = ({
  label,
  additionalLabel,
  additionalButton,
  children,
  htmlFor,
  style,
  className,
  error
}) => {
  const hasShowLabel = label || additionalLabel

  return (
    <>
      {hasShowLabel && (
        <div className={s.topCont}>
          <label style={style} htmlFor={htmlFor} className={cls(s.label, className)}>
            <span>{label}</span>
          </label>
          {additionalLabel && (
            <span className={s.additionallabel}>{additionalLabel}</span>
          )}
          {additionalButton && additionalButton}
        </div>
      )}
      {children}
      {error && <p className={s.error}>{error}</p>}
    </>
  )
}

export { Label }
