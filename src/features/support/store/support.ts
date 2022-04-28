import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'

export type TInit = {
  problems: { value: string; label: string }[]
  modalOpen: boolean
}

export const init: TInit = {
  problems: [
    { value: 'Withdrawal', label: 'Withdrawal' },
    { value: 'Email Change', label: 'Email Change' },
    { value: 'Deposit', label: 'Deposit' },
    { value: 'Verification', label: 'Verification' },
    { value: 'Security', label: 'Security' },
    { value: 'General Account Information', label: 'General Account Information' },
    { value: 'Suggestion', label: 'Suggestion' },
    { value: 'Other', label: 'Other' }
  ],
  modalOpen: false
}

const support = createSlice({
  name: 'support',
  initialState: init,
  reducers: {
    setModalOpen(state, action: PayloadAction<TInit['modalOpen']>) {
      state.modalOpen = action.payload
    },
    reset: () => init
  }
})

export const { reset, setModalOpen } = support.actions

export const selectSupport: TSelector<TInit> = (state) => state.support

export default support.reducer
