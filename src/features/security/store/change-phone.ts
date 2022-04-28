import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { getProfile } from '@/store/auth'
import { apiChangePhone, TCheckNewCodeReq } from '@/requests/change-phone'
import { setModalError, setInlineError } from '@/store/error'
import axios from 'axios'
import { TFormPropsAsync } from '@/types/formik'
import { ErrorStatus } from '@/types/error'

type TSendOldCodeProps = {
  hasResend?: boolean
}

export type TInit = {
  step: null | 'prev-confirm' | 'new-phone' | 'new-confirm' | 'success'
  fetching: boolean
  fetchingResend: boolean
  error: string
  newPhone: string
}

export const init: TInit = {
  step: null,
  fetching: false,
  fetchingResend: false,
  error: '',
  newPhone: ''
}

const changePhone = createSlice({
  name: 'change-phone',
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
    setNewPhone(state, action: PayloadAction<TInit['newPhone']>) {
      state.newPhone = action.payload
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching, setError, setFetchingResend, setNewPhone } =
  changePhone.actions

export const selectChangePhone: TSelector<TInit> = (state) => state.changePhone

export default changePhone.reducer

export const sendOldCode =
  ({ hasResend = false }: TSendOldCodeProps): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetchingResend(true))

      await apiChangePhone.sendOldCode()

      dispatch(setFetchingResend(false))
      if (!hasResend) {
        dispatch(setStep('prev-confirm'))
      }
    } catch (e) {
      dispatch(setFetchingResend(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message && !hasResend) {
        dispatch(setModalError(data.message))
        return
      }

      if (status === ErrorStatus.Message && hasResend) {
        dispatch(setError(data.message))
      }
    }
  }

export const checkOldCode =
  (code: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiChangePhone.checkOldPhone({ code })

      dispatch(setFetching(false))
      dispatch(setStep('new-phone'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setError(data.message))
      }
    }
  }

export const resendCodeForNewPhone = (): TAsyncAction => async (dispatch, getState) => {
  try {
    dispatch(setFetchingResend(true))
    const { changePhone } = getState()

    await apiChangePhone.sendNewCode({ newPhone: changePhone.newPhone })

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

export const sendNewPhone =
  ({ formData, formik }: TFormPropsAsync<TCheckNewCodeReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setNewPhone(formData.newPhone))
      dispatch(setFetching(true))

      await apiChangePhone.sendNewCode(formData)

      dispatch(setFetching(false))

      dispatch(setStep('new-confirm'))
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Validation) {
        formik.setErrors(data.errors)
        return
      }

      if (status === ErrorStatus.Message) {
        dispatch(setInlineError(data.message))
      }
    }
  }

export const checkNewCode =
  (code: string): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiChangePhone.checkNewPhone({ code })

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
