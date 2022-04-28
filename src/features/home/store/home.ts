import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAsyncAction, TSelector } from '@/store'
import axios from 'axios'
import { ErrorStatus } from '@/types/error'
import { apiSendEmail, TSendEmailReq } from '@/requests/home'
import Router from 'next/router'
import { ROUTES } from '@/constants/routes'
import { setModalError } from '@/store/error'

export type TInit = {
  fetching: boolean
}

export const init: TInit = {
  fetching: false
}

const home = createSlice({
  name: 'home',
  initialState: init,
  reducers: {
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    reset: () => init
  }
})

export const { reset, setFetching } = home.actions

export const selectHomeState: TSelector<TInit> = (state) => state.home

export default home.reducer

export const sendEmailAsync =
  (email: TSendEmailReq['email']): TAsyncAction =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true))

      const {
        data: { isEmailFree }
      } = await apiSendEmail.sendEmail(email)

      dispatch(setFetching(false))

      if (isEmailFree) {
        await Router.push({ pathname: ROUTES.SIGN_UP, query: { email } })
      } else {
        await Router.push({ pathname: ROUTES.SIGN_IN, query: { email } })
      }
    } catch (e) {
      dispatch(setFetching(false))
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status === ErrorStatus.Message) {
        dispatch(setModalError(data.message))
      }
    }
  }
