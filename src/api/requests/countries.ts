import { TSelectOptions } from '@/components/inputs/selects/types'
import { TAxiosResponse } from '../types'
import { api } from '../api'

export type TGetCountriesRes = {
  countries: TSelectOptions
}

const getCountries = (): TAxiosResponse<TGetCountriesRes> =>
  api.get('/country/available-countries')

export const apiCountries = { getCountries }
