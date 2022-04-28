import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { getProfile } from '@/store/auth'
import { TSelector, TAsyncAction } from '@/store'
import { apiChangeEmail, TNewEmailReq } from '@/requests/change-email'
import { TFormPropsAsync } from '@/types/formik'
import { setModalError } from '@/store/error'
import { ErrorStatus } from '@/types/error'

export type TInit = {
  step: null | 'confirm-old' | 'change-email' | 'confirm-new' | 'success' | 'error'
  fetching: boolean
  fetchingResend: boolean
  error: string
  newEmail: string
}

export const init: TInit = {
  step: null,
  fetching: false,
  fetchingResend: false,
  error: '',
  newEmail: ''
}

const changeEmail = createSlice({
  name: 'change-email',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
      state.error = ''
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
    setNewEmail(state, action: PayloadAction<string>) {
      state.newEmail = action.payload
      state.step = 'confirm-new'
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching, setError, setNewEmail, setFetchingResend } =
  changeEmail.actions

export const selectChangeEmail: TSelector<TInit> = (state) => state.changeEmail

export default changeEmail.reducer

export const getOldCode = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(setFetchingResend(true))

    await apiChangeEmail.getOldEmailCode()

    dispatch(setFetchingResend(false))
    dispatch(setStep('confirm-old'))
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (status === ErrorStatus.Message) {
      dispatch(setModalError(data.message))
    }
  }
}

export const sendOldCode =
  (code: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiChangeEmail.sendOldEmailCode({ code })

      dispatch(setFetching(false))
      dispatch(setStep('change-email'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }

export const sendNewEmail =
  ({ formData, formik }: TFormPropsAsync<TNewEmailReq>): TAsyncAction =>
  async (dispatch) => {
    const { newEmail } = formData
    try {
      dispatch(setFetching(true))

      await apiChangeEmail.sendNewEmail({ newEmail })

      dispatch(setNewEmail(newEmail))
      dispatch(setFetching(false))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Validation) {
        formik.setErrors(data.errors)
        return
      }

      if (status === ErrorStatus.Message) {
        dispatch(setStep('error'))
      }
    }
  }

export const sendNewCode =
  (code: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiChangeEmail.sendNewEmailCode({ code })

      dispatch(setFetching(false))
      dispatch(setStep('success'))
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

export const getNewCode = (): TAsyncAction => async (dispatch, getState) => {
  try {
    const {
      changeEmail: { newEmail }
    } = getState()

    dispatch(setFetchingResend(true))

    await apiChangeEmail.sendNewEmail({ newEmail })

    dispatch(setFetchingResend(false))
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}
