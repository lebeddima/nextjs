type NumberFormat = (value: number, decimal: number, locale?: string) => string

export const numberFormat: NumberFormat = (value, decimal, locale = 'en') => {
  const number = Number(value)
  return number.toLocaleString(locale, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  })
}
