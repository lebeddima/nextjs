import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { TFormPropsAsync } from '@/types/formik'
// import axios from 'axios'
import { TSelector } from '@/store'

export type TInit = {
  step: null | 'password' | 'sms' | 'success'
  fetching: boolean
  fetchingResend: boolean
  error: string
}

export const init: TInit = {
  step: null,
  fetching: false,
  fetchingResend: false,
  error: ''
}

const deactivate = createSlice({
  name: 'deactivate',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    setFetchingResend(state, action: PayloadAction<TInit['fetchingResend']>) {
      state.fetchingResend = action.payload
    },
    setError(state, action: PayloadAction<TInit['error']>) {
      state.error = action.payload
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching, setFetchingResend, setError } =
  deactivate.actions

export const selectDeactivate: TSelector<TInit> = (state) => state.deactivate

export default deactivate.reducer
