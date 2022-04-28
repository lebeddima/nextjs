import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import signUp from '@/features/auth/store/sign-up'
import signIn from '@/features/auth/store/sign-in'
import recoveryPass from '@/features/auth/store/recovery-password'
import recoveryNewPass from '@/features/auth/store/new-password'
import support from '@/features/support/store/support'
import deactivate from '@/features/deactivation/store/deactivate'
import changePass from '@/features/security/store/change-pass'
import google2fa from '@/features/security/store/google2fa'
import changePhone from '@/features/security/store/change-phone'
import home from '@/features/home/store/home'
import changeEmail from '@/features/security/store/change-email'
import wallet from '@/features/wallet/store/wallet'
import notifications from '@/features/notifications/store/notifications'
import market from '@/features/market/store/market'
import history from '@/features/history/store/history'
import error from './error'
import auth from './auth'
import country from './country'

const store = configureStore({
  reducer: {
    auth,
    country,
    signUp,
    signIn,
    error,
    recoveryPass,
    recoveryNewPass,
    deactivate,
    changePass,
    changePhone,
    changeEmail,
    support,
    google2fa,
    home,
    notifications,
    wallet,
    market,
    history
  }
})

export default store

export type TStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch
export type TAsyncAction = ThunkAction<void, TRootState, unknown, AnyAction>
export type TSelector<P> = (s: TRootState) => P
