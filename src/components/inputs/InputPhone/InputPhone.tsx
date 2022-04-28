import cn from 'classnames'
import PhoneInput from 'react-phone-input-2'
import ct from 'countries-and-timezones'
import 'react-phone-input-2/lib/style.css'
import { Label } from '@/components/inputs/Label'
import { TInputPhoneProps } from '../types'
import s from './InputPhone.module.scss'

export const InputPhone: React.FC<TInputPhoneProps> = ({
  disabled,
  readOnly,
  onChange,
  error,
  placeholder,
  styleContainer,
  classContainer,
  label,
  menuShort,
  value,
  name,
  id,
  onEnterKey
}) => {
  const timezone = ct.getTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const country = timezone && timezone.countries[0]

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onEnterKey) return
    if (e.key === 'Enter' || e.code === 'NumpadEnter') {
      onEnterKey()
    }
  }

  return (
    <div className={classContainer}>
      <Label {...label} error={error}>
        <PhoneInput
          value={value}
          country={country ? country.toLowerCase() : 'us'}
          onChange={onChange}
          placeholder={placeholder}
          disableSearchIcon
          enableSearch
          inputClass={cn(s.input, {
            [s.error]: error,
            [s.disabled]: disabled,
            [s.readOnly]: readOnly
          })}
          inputProps={{ id, name }}
          containerStyle={styleContainer}
          containerClass={s.container}
          buttonClass={cn(s.button, { [s.disabled]: disabled, [s.readOnly]: readOnly })}
          dropdownClass={cn(s.countryList, s.dropdown, {
            [s.menuShort]: menuShort
          })}
          searchClass={s.search}
          disabled={disabled}
          onKeyDown={handleKeyDown}
        />
      </Label>
    </div>
  )
}
