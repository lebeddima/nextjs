import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { TSelector, TAsyncAction } from '@/store'
import { setModalError } from '@/store/error'
import { ErrorStatus } from '@/types/error'
import { apiWallet, IWallet } from '@/requests/wallet'
import { TWalletTab } from '@/types/global'

export type TInit = {
  fetching: boolean
  walletData: IWallet[] | null
  walletTab: TWalletTab
}

export const init: TInit = {
  fetching: false,
  walletData: null,
  walletTab: 'CRYPTO'
}

const wallet = createSlice({
  name: 'wallet',
  initialState: init,
  reducers: {
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    setWalletData(state, action: PayloadAction<TInit['walletData']>) {
      state.walletData = action.payload
    },
    setWalletTab(state, action: PayloadAction<TInit['walletTab']>) {
      state.walletTab = action.payload
    },
    reset: () => init
  }
})

export const { reset, setFetching, setWalletData, setWalletTab } = wallet.actions

export const selectWallet: TSelector<TInit> = (state) => state.wallet

export const selectWalletData = createSelector(
  selectWallet,
  ({ walletData, walletTab }) => {
    if (!walletData) return null
    return walletData.filter((item) => item.assetInfo.type === walletTab)
  }
)

export default wallet.reducer

export const getWallet = (): TAsyncAction => async (dispatch) => {
  try {
    dispatch(setFetching(true))

    const { data } = await apiWallet.getWalletRequest()

    dispatch(setWalletData(data))

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
