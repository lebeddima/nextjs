import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFormPropsAsync } from '@/types/formik'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import {
  apiRecoveryPass,
  TSendPassReq,
  TCheckTokenReq
} from '@/requests/recovery-password'
import { ErrorStatus } from '@/types/error'

export type TInit = {
  token: string
  step: null | 'new-pass' | 'success' | 'token-error'
  fetching: boolean
}

export const init: TInit = {
  token: '',
  step: null,
  fetching: false
}

const recoveryNewPass = createSlice({
  name: 'recovery-new-pass',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    setToken(state, action: PayloadAction<TInit['token']>) {
      state.token = action.payload
    },
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching, setToken } = recoveryNewPass.actions

export const selectNewPass: TSelector<TInit> = (state) => state.recoveryNewPass

export default recoveryNewPass.reducer

// check token async
export const checkTokenAsync =
  (data: TCheckTokenReq): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiRecoveryPass.checkToken(data)

      dispatch(setFetching(false))
      dispatch(setToken(data.token))
      dispatch(setStep('new-pass'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setStep('token-error'))
      }
    }
  }

// send pass async
export const sendPassAsync =
  ({ formData, formik }: TFormPropsAsync<TSendPassReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiRecoveryPass.sendPass(formData)

      dispatch(setFetching(false))
      dispatch(setStep('success'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Validation) {
        formik.setErrors(data.errors)
        return
      }

      if (status === ErrorStatus.Message) {
        dispatch(setStep('token-error'))
      }
    }
  }
