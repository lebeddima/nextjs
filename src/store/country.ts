import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { apiCountries, TGetCountriesRes } from '@/requests/countries'

export type TInit = {
  countries: {
    init: boolean
    data: TGetCountriesRes['countries']
  }
}

const init: TInit = {
  countries: {
    init: false,
    data: {} as TInit['countries']['data']
  }
}

const country = createSlice({
  name: 'country',
  initialState: init,
  reducers: {
    setCountry(state, action: PayloadAction<TGetCountriesRes>) {
      state.countries = {
        init: true,
        data: action.payload.countries
      }
    },
    reset: () => init
  }
})

export const { reset, setCountry } = country.actions
export const selectCountry: TSelector<TInit> = (state) => state.country
export default country.reducer

export const getCountryAsync = (): TAsyncAction => async (dispatch) => {
  try {
    const { data } = await apiCountries.getCountries()
    dispatch(setCountry(data))
  } catch (e) {
    //
  }
}
