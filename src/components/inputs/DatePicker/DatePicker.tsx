import React, { useEffect, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import cn from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { createClass } from '@/utils/createClass'
import { Label } from '@/components/inputs/Label'
import { DATE_FORMATS } from '@/constants/date'
import type { LocaleUtils } from 'react-day-picker/types/LocaleUtils'
import { TDatePickerType, TInputThemes } from '../types'
import s from './DatePicker.module.scss'

type TYearMonthProps = {
  date: Date
  localeUtils: LocaleUtils
  onChange: (date: Date) => void
  fromMonth: Date
  toMonth: Date
}

export const YearMonthForm: React.FC<TYearMonthProps> = ({
  date,
  localeUtils,
  onChange,
  fromMonth,
  toMonth
}) => {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth?.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }
  // eslint-disable-next-line
  const handleChange = (e: any) => {
    const { year, month } = e.target.form

    onChange(new Date(year.value, month.value))
  }

  return (
    <div className="DayPicker-Caption">
      <select
        className={cn(s.monthSelect)}
        name="month"
        onChange={handleChange}
        value={date.getMonth()}
      >
        {months.map((month: string, i: number) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        className={cn(s.yearSelect)}
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export const DatePicker: React.FC<TDatePickerType> = ({
  firstDayOfWeek,
  range,
  onDateFrom,
  onDateTo,
  clear,
  disable,
  theme = 'primary',
  color,
  shape,
  font,
  label,
  error,
  id,
  placeholder,
  fromMonth,
  toMonth
}) => {
  const { t, lang } = useTranslation('date')
  const [valueFrom, setValueFrom] = useState<Date | undefined>(undefined)
  const [valueTo, setValueTo] = useState<Date | undefined>(undefined)
  const [month, setMonth] = useState<Date | undefined>(fromMonth)

  const handleYearMonthChange = (month: Date) => {
    setMonth(month)
  }

  const format = DATE_FORMATS[lang]

  useEffect(() => {
    if (!clear) {
      return
    }
    setValueFrom(undefined)
    setValueTo(undefined)
  }, [clear])

  const MONTHS = [
    t('month.jan'),
    t('month.feb'),
    t('month.mar'),
    t('month.apr'),
    t('month.may'),
    t('month.june'),
    t('month.july'),
    t('month.aug'),
    t('month.sept'),
    t('month.oct'),
    t('month.nov'),
    t('month.dec')
  ]

  const WEEKDAYS_SHORT = [
    t('weekdays-abbrev.su'),
    t('weekdays-abbrev.mo'),
    t('weekdays-abbrev.tu'),
    t('weekdays-abbrev.we'),
    t('weekdays-abbrev.th'),
    t('weekdays-abbrev.fr'),
    t('weekdays-abbrev.sa')
  ]

  const parseDate = (str: string, format: string, locale: string) => {
    const formatLocale = locale as unknown as Locale | undefined
    const parsed = dateFnsParse(str, format, new Date(), { locale: formatLocale })
    if (DateUtils.isDate(parsed)) {
      return parsed
    }
  }

  const formatDate = (date: Date, format: string, locale: string) => {
    const formatLocale = locale as unknown as Locale | undefined
    return dateFnsFormat(date, format, { locale: formatLocale })
  }

  const onClickFrom = (d: Date) => {
    if (onDateFrom) {
      onDateFrom(d)
    }
    setValueFrom(d)
  }

  const onClickTo = (d: Date) => {
    if (onDateTo) {
      onDateTo(d)
    }
    setValueTo(d)
  }

  const propsThemes: TInputThemes = {
    ...(theme === 'primary' && {
      shape: 'big',
      color: 'primary',
      font: 'big'
    }),
    ...(theme === 'primary-small' && {
      shape: 'small',
      color: 'primary',
      font: 'small'
    }),
    ...(color && { color }),
    ...(shape && { shape }),
    ...(font && { font })
  }

  const classes = createClass<TInputThemes>(propsThemes, s)

  return (
    <div className={cn(s.container, { [s.disable]: disable })}>
      <Label {...label} error={error} htmlFor={id}>
        <DayPickerInput
          dayPickerProps={{
            month,
            fromMonth,
            toMonth,
            weekdaysShort: WEEKDAYS_SHORT,
            className: s.dayPicker,
            firstDayOfWeek,
            onDayClick: onClickFrom,
            captionElement: ({ date, localeUtils }) => (
              <YearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={handleYearMonthChange}
                fromMonth={fromMonth}
                toMonth={toMonth}
              />
            )
          }}
          inputProps={{
            className: cn(s.input, classes, { [s.error]: error }),
            readOnly: true
          }}
          value={valueFrom}
          formatDate={formatDate}
          format={format}
          parseDate={parseDate}
          placeholder={placeholder}
        />
        {range && (
          <>
            <div className={s.hyphen} />
            <DayPickerInput
              dayPickerProps={{
                months: MONTHS,
                weekdaysShort: WEEKDAYS_SHORT,
                className: cn(s.dayPicker, s.right),
                firstDayOfWeek,
                onDayClick: onClickTo
              }}
              inputProps={{
                className: cn(s.input, classes, { [s.error]: error }),
                readOnly: true
              }}
              value={valueTo}
              formatDate={formatDate}
              format={format}
              parseDate={parseDate}
              placeholder={placeholder}
            />
          </>
        )}
      </Label>
    </div>
  )
}
