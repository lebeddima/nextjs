import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFormPropsAsync } from '@/types/formik'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import { setUser, setAuthTokens } from '@/store/auth'
import { apiSignIn } from '@/requests/sign-in'
import { ErrorStatus } from '@/types/error'
import { setModalError } from '@/store/error'

type TSignInReq = {
  phoneNumber: string
  email: string | string[]
  password: string
}

export enum EAuthMethod {
  email = 'email',
  phone = 'phone'
}

export type TInit = {
  authMethod: EAuthMethod.email | EAuthMethod.phone
  step:
    | null
    | 'EMAIL'
    | 'complete-registration'
    | 'error-email'
    | 'PHONE'
    | 'error-phone'
    | 'GOOGLE'
    | 'error-times'
  fetching: boolean
  fetchingResend: boolean
  fetchingGlobal: boolean
  error: string
  activationStep: null | 'email' | 'sms'
}

export const init: TInit = {
  authMethod: EAuthMethod.email,
  step: null,
  fetching: false,
  fetchingResend: false,
  fetchingGlobal: false,
  error: '',
  activationStep: null
}

const signIn = createSlice({
  name: 'signIn',
  initialState: init,
  reducers: {
    setAuthMethod(state, action: PayloadAction<TInit['authMethod']>) {
      state.authMethod = action.payload
    },
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
      state.error = ''
    },
    resetStep(state) {
      state.step = null
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
    setActivationStep(state, action: PayloadAction<TInit['activationStep']>) {
      state.activationStep = action.payload
    },
    reset: () => init
  }
})

export const {
  reset,
  setAuthMethod,
  setStep,
  setFetching,
  setFetchingResend,
  setFetchingGlobal,
  setError,
  setActivationStep
} = signIn.actions

export const selectSignIn: TSelector<TInit> = (state) => state.signIn

export default signIn.reducer

// send email
export const sendEmailAsync = (): TAsyncAction => async (dispatch, getState) => {
  const { auth, signIn } = getState()
  try {
    if (!auth.user) return

    if (signIn.step !== 'EMAIL') {
      dispatch(setFetchingGlobal(true))
    } else {
      dispatch(setFetchingResend(true))
    }

    await apiSignIn.sendEmail(auth.user._id)

    if (signIn.step !== 'EMAIL') {
      dispatch(setStep('EMAIL'))
      dispatch(setFetchingGlobal(false))
    } else {
      dispatch(setFetchingResend(false))
    }
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (signIn.step !== 'EMAIL') {
      dispatch(setStep('error-email'))
      dispatch(setFetchingGlobal(false))
    }

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}

// send sms
export const sendSmsAsync = (): TAsyncAction => async (dispatch, getState) => {
  const { auth, signIn } = getState()
  try {
    if (!auth.user) return

    if (signIn.step !== 'PHONE') {
      dispatch(setFetchingGlobal(true))
    } else {
      dispatch(setFetchingResend(true))
    }

    await apiSignIn.sendSms(auth.user._id)

    if (signIn.step !== 'PHONE') {
      dispatch(setStep('PHONE'))
      dispatch(setFetchingGlobal(false))
    } else {
      dispatch(setFetchingResend(false))
    }
  } catch (e) {
    dispatch(setFetchingResend(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (signIn.step !== 'PHONE') {
      dispatch(setStep('error-phone'))
      dispatch(setFetchingGlobal(false))
    }

    if (status === ErrorStatus.Message) {
      dispatch(setError(data.message))
    }
  }
}

export const sendGoogle2faCodeAsync =
  (code: string): TAsyncAction =>
  async (dispatch, getState) => {
    const { auth } = getState()
    try {
      if (!auth.user || !auth.activationStatus) return

      dispatch(setFetching(true))

      const { data } = await apiSignIn.sendGoogle2faCode({
        id: auth.user._id,
        confirmationCode: code
      })

      dispatch(setFetching(false))

      if (data.tokens) {
        dispatch(setAuthTokens(data.tokens))
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

// send email code
export const sendEmailCodeAsync =
  (code: string): TAsyncAction =>
  async (dispatch, getState) => {
    const { auth } = getState()
    try {
      if (!auth.user || !auth.activationStatus) return

      dispatch(setFetching(true))

      const { data } = await apiSignIn.sendEmailCode({
        id: auth.user._id,
        confirmationCode: code
      })

      dispatch(setFetching(false))

      if (data.twoFA === 'GOOGLE') {
        dispatch(setStep(data.twoFA))
        return
      }

      if (data.tokens) {
        dispatch(setAuthTokens(data.tokens))
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

// send sms code
export const sendSmsCodeAsync =
  (code: string): TAsyncAction =>
  async (dispatch, getState) => {
    const { auth } = getState()
    try {
      if (!auth.user || !auth.activationStatus) return

      dispatch(setFetching(true))

      const { data } = await apiSignIn.sendSmsCode({
        id: auth.user._id,
        confirmationCode: code
      })

      dispatch(setFetching(false))

      if (data.twoFA === 'GOOGLE') {
        dispatch(setStep(data.twoFA))
        return
      }

      if (data.tokens) {
        dispatch(setAuthTokens(data.tokens))
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

// send sign-in form
export const signInAsync =
  ({ formData, formik }: TFormPropsAsync<TSignInReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      const { data } = await apiSignIn.signIn({
        password: formData.password,
        ...(formData.email && { email: formData.email }),
        ...(formData.phoneNumber && { phoneNumber: formData.phoneNumber })
      })

      dispatch(setUser({ data }))
      dispatch(setFetching(false))

      if (!data.activationStatus.emailActivated) {
        dispatch(setActivationStep('email'))
        dispatch(setStep('complete-registration'))
        return
      }
      if (!data.activationStatus.phoneActivated) {
        dispatch(setActivationStep('sms'))
        dispatch(setStep('complete-registration'))
        return
      }
      if (data.twoFA === 'EMAIL') {
        dispatch(sendEmailAsync())
        return
      }
      if (data.twoFA === 'PHONE') {
        dispatch(sendSmsAsync())
        return
      }
      if (data.twoFA === 'GOOGLE') {
        dispatch(setStep(data.twoFA))
        return
      }
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Validation) {
        formik.setErrors(data.errors)
        return
      }

      if (status === ErrorStatus.Message && data.errorCode === 'three times') {
        dispatch(setStep('error-times'))
        return
      }

      if (status === ErrorStatus.Message) {
        dispatch(setModalError(data.message))
      }
    }
  }
