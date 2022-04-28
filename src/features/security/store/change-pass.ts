import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TFormPropsAsync } from '@/types/formik'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import { apiChangePass, TSendPassReq } from '@/requests/change-password'
import { ErrorStatus } from '@/types/error'
import { setInlineError } from '@/store/error'

export type TInit = {
  step: null | 'change-pass' | 'success'
  fetching: boolean
}

export const init: TInit = {
  step: null,
  fetching: false
}

const changePass = createSlice({
  name: 'change-pass',
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

export const { reset, setStep, setFetching } = changePass.actions

export const selectChangePass: TSelector<TInit> = (state) => state.changePass

export default changePass.reducer

// send pass async
export const sendPassAsync =
  ({ formData, formik }: TFormPropsAsync<TSendPassReq>): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      await apiChangePass.sendPass(formData)

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
        dispatch(setInlineError(data.message))
      }
    }
  }
