import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import axios from 'axios'
import { setUser } from '@/store/auth'
import { TFormPropsAsync } from '@/types/formik'
import { apiSignUp, TSignUpReq } from '@/requests/sign-up'
import { ErrorStatus } from '@/types/error'
import { setModalError } from '@/store/error'

export type TInit = {
  step: null | 'email' | 'error-email' | 'phone' | 'error-phone' | 'success'
  fetching: boolean
  fetchingResend: boolean
  fetchingGlobal: boolean
  error: string
}

const init: TInit = {
  step: null,
  fetching: false,
  fetchingResend: false,
  fetchingGlobal: false,
  error: ''
}

const signUp = createSlice({
  name: 'signUp',
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
    setFetchingGlobal(state, action: PayloadAction<TInit['fetchingGlobal']>) {
      state.fetchingGlobal = action.payload
    },
    setError(state, action: PayloadAction<TInit['error']>) {
      state.error = action.payload
    },
    reset: () => init
  }
})

export const {
  reset,
  setStep,
  setFetching,
  setFetchingResend,
  setFetchingGlobal,
  setError
} = signUp.actions

export const selectSignUp: TSelector<TInit> = (state) => state.signUp

export default signUp.reducer

// send confirm email
export const sendEmailAsync = (): TAsyncAction => async (dispatch, getState) => {
  const { auth, signUp } = getState()
  try {
    if (!auth.user) return

    if (signUp.step !== 'email') {
      dispatch(setFetchingGlobal(true))
    } else {
      dispatch(setFetchingResend(true))
    }

    await apiSignUp.sendEmail(auth.user._id)

    if (signUp.step !== 'email') {
      dispatch(setStep('email'))
      dispatch(setFetchingGlobal(false))
    } else {
      dispatch(setFetchingResend(false))
    }
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (signUp.step !== 'email') {
      dispatch(setStep('error-email'))
      dispatch(setFetchingGlobal(false))
    }

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}

// send confirm sms
export const sendSmsAsync = (): TAsyncAction => async (dispatch, getState) => {
  const { auth, signUp } = getState()
  try {
    if (!auth.user) return

    if (signUp.step !== 'phone') {
      dispatch(setFetchingGlobal(true))
    } else {
      dispatch(setFetchingResend(true))
    }

    await apiSignUp.sendSms(auth.user._id)

    if (signUp.step !== 'phone') {
      dispatch(setStep('phone'))
      dispatch(setFetchingGlobal(false))
    } else {
      dispatch(setFetchingResend(false))
    }
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (signUp.step !== 'phone') {
      dispatch(setStep('error-phone'))
      dispatch(setFetchingGlobal(false))
    }

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}

// send confirm email code
export const sendEmailCode =
  (code: string): TAsyncAction =>
  async (dispatch, getState) => {
    const { auth } = getState()
    try {
      if (!auth.user || !auth.activationStatus) return

      dispatch(setFetching(true))

      await apiSignUp.sendEmailCode({
        id: auth.user._id,
        emailConfirmationCode: code
      })

      dispatch(setFetching(false))
      if (!auth.activationStatus.phoneActivated) {
        dispatch(sendSmsAsync())
      }
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }

// send confirm sms code
export const sendSmsCode =
  (code: string): TAsyncAction =>
  async (dispatch, getState) => {
    const { auth } = getState()
    try {
      if (!auth.user || !auth.activationStatus) return

      dispatch(setFetching(true))

      await apiSignUp.sendSmsCode({ id: auth.user._id, phoneConfirmationCode: code })

      dispatch(setFetching(false))
      dispatch(setStep('success'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }

// send sign-up form
export const signUpAsync =
  ({ formData, formik }: TFormPropsAsync<TSignUpReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))
      const { data } = await apiSignUp.signUp(formData)
      dispatch(setUser({ data }))
      dispatch(setFetching(false))

      if (!data.activationStatus.emailActivated) {
        dispatch(sendEmailAsync())
        return
      }
      if (!data.activationStatus.phoneActivated) {
        dispatch(sendSmsAsync())
      }
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Validation) {
        formik.setErrors(data.errors)
        return
      }

      if (status === ErrorStatus.Message) {
        dispatch(setModalError(data.message))
      }
    }
  }
