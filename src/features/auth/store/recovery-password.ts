import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFormPropsAsync } from '@/types/formik'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import { apiRecoveryPass, TSendEmailReq } from '@/requests/recovery-password'
import { setModalError } from '@/store/error'
import { ErrorStatus } from '@/types/error'

export type TInit = {
  step: { step: null | 'success'; email: TSendEmailReq['email'] }
  fetching: boolean
}

export const init: TInit = {
  step: { step: null, email: '' },
  fetching: false
}

const recoveryPass = createSlice({
  name: 'recovery-password',
  initialState: init,
  reducers: {
    setStep(state, action: PayloadAction<TInit['step']>) {
      state.step = action.payload
    },
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    reset: () => init
  }
})

export const { reset, setStep, setFetching } = recoveryPass.actions

export const selectRecoveryPass: TSelector<TInit> = (state) => state.recoveryPass

export default recoveryPass.reducer

// send email form
export const sendEmailAsync =
  ({ formData, formik }: TFormPropsAsync<TSendEmailReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiRecoveryPass.sendEnail(formData)

      dispatch(setFetching(false))
      dispatch(setStep({ step: 'success', email: formData.email }))
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

export const sendEmailAgain = (): TAsyncAction => async (dispatch, getState) => {
  try {
    const {
      step: { email }
    } = getState().recoveryPass
    dispatch(setFetching(true))

    await apiRecoveryPass.sendEnail({ email })

    dispatch(setFetching(false))
  } catch (e) {
    dispatch(setFetching(false))
    if (!axios.isAxiosError(e) || !e.response) return
    const { status, data } = e.response

    if (status === ErrorStatus.Message) {
      dispatch(setModalError(data.message))
    }
  }
}
