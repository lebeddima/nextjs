import cn from 'classnames'
import { TCheckBoxProps } from '../types'
import s from './CheckBox.module.scss'

export const CheckBox: React.FC<TCheckBoxProps> = (pr) => {
  const {
    disabled,
    notActive,
    type,
    style,
    onChange,
    name = '',
    value,
    error,
    id,
    theme = 'circle',
    font = 'caption-1',
    checked,
    label,
    ...props
  } = pr

  return (
    <>
      <div
        className={cn(s.container, s[theme], s[`font_${font}`], {
          [s.notActive]: notActive,
          [s.disabled]: disabled
        })}
      >
        <label className={s.labelInput} htmlFor={id}>
          <input
            type={type}
            disabled={disabled}
            onChange={onChange}
            name={name}
            value={value}
            checked={checked}
            id={id}
            {...props}
          />
          <div className={cn(s.target)} style={style} />
        </label>
        {label && (
          <label className={s.labelText} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error && <p className={s.error}>{error}</p>}
    </>
  )
}
