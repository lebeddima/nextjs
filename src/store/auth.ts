import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authToken } from '@/browserApi/authToken'
import { refreshToken } from '@/browserApi/refreshToken'
import Router from 'next/router'
import { apiUser } from '@/requests/user'
import { TTokens, TActivationStatus, TUserData, TUser, TTfa } from '@/types/auth'
import { ROUTES } from '@/routes'
import { setModalError } from '@/store/error'
import { TSelector, TAsyncAction } from '@/store'

export type TInit = {
  userFetching: boolean
  user: TUser | null
  twoFa: TTfa
  activationStatus: TActivationStatus | null
  hasAuth: boolean
}

const init: TInit = {
  userFetching: true,
  user: null,
  twoFa: null,
  activationStatus: null,
  hasAuth: false
}

const auth = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    setUser(state, action: PayloadAction<{ data: TUserData; hasAuth?: boolean }>) {
      state.user = action.payload.data.user
      state.activationStatus = action.payload.data.activationStatus
      state.userFetching = false
      if (action.payload.hasAuth) {
        state.hasAuth = true
      }
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.hasAuth = action.payload
      state.userFetching = false
    },
    setUserFetching(state, action: PayloadAction<boolean>) {
      state.userFetching = action.payload
    },
    removeUser(state) {
      state.user = null
      state.activationStatus = null
      state.hasAuth = false
    },
    reset: () => init
  }
})

export const { reset, setUser, setAuth, setUserFetching, removeUser } = auth.actions
export const selectUser: TSelector<TInit> = (state) => state.auth

export default auth.reducer

export const setAuthTokens =
  (tokens: TTokens): TAsyncAction =>
  async (dispatch) => {
    authToken.set(tokens.accessToken)
    refreshToken.set(tokens.refreshToken)
    dispatch(setAuth(true))
  }

export const getProfile = (): TAsyncAction => async (dispatch) => {
  try {
    if (!authToken.get()) {
      dispatch(setUserFetching(false))
      return
    }
    const { data } = await apiUser.getProfile()
    dispatch(setUser({ data, hasAuth: true }))
  } catch (e) {
    dispatch(setUserFetching(false))

    if (!axios.isAxiosError(e) || !e.response) return
    const { data } = e.response

    dispatch(setModalError(data.message))
  }
}

export const logout = (): TAsyncAction => async (dispatch) => {
  authToken.remove()
  refreshToken.remove()
  dispatch(removeUser())
  Router.push(ROUTES.HOME)
}
