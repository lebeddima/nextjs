import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import { apiGoogle2fa, TActivateResponse } from '@/requests/google-2fa'
import { getProfile } from '@/store/auth'
import { ErrorStatus } from '@/types/error'

export type TInit = {
  step:
    | null
    | 'disable'
    | 'activate'
    | 'code'
    | 'accessCodes'
    | 'success'
    | 'disableSuccess'
  fetching: boolean
  qrCode: string | null
  secret: string | null
  error: string
  backupCodes: string[]
}

export const init: TInit = {
  step: null,
  fetching: false,
  qrCode: null,
  secret: null,
  backupCodes: [],
  error: ''
}

const google2fa = createSlice({
  name: 'google2fa',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    setActivate(state, action: PayloadAction<TActivateResponse>) {
      state.qrCode = action.payload.qrCode
      state.secret = action.payload.secret
      state.fetching = false
      state.step = 'activate'
    },
    setBackupCodes(state, action: PayloadAction<TInit['backupCodes']>) {
      state.backupCodes = action.payload
      state.fetching = false
      state.step = 'accessCodes'
    },

    setError(state, action: PayloadAction<TInit['error']>) {
      state.error = action.payload
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching, setActivate, setError, setBackupCodes } =
  google2fa.actions

export const selectGoogle2fa: TSelector<TInit> = (state) => state.google2fa

export default google2fa.reducer

export const googleActivation = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(setFetching(true))

    const response = await apiGoogle2fa.activate()
    dispatch(setActivate(response.data))
  } catch (e) {
    dispatch(setFetching(false))

    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}

export const googleDisable =
  (confirmationCode: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiGoogle2fa.disable({ confirmationCode })

      dispatch(setFetching(false))
      dispatch(setStep('disableSuccess'))
      dispatch(getProfile())
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }

export const googleSubmit =
  (confirmationCode: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      const result = await apiGoogle2fa.submit({ confirmationCode })

      const { backupCodes } = result.data

      dispatch(setBackupCodes(backupCodes))
      dispatch(getProfile())
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }
