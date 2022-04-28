import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { mockedHistoryData } from '../mockedData'

export type TInit = {
  fetching: boolean
  historyData: typeof mockedHistoryData
}

export const init: TInit = {
  fetching: false,
  historyData: mockedHistoryData
}

const history = createSlice({
  name: 'history',
  initialState: init,
  reducers: {
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    setHistoryData(state, action: PayloadAction<TInit['historyData']>) {
      state.historyData = action.payload
    },
    reset: () => init
  }
})

export const { reset, setFetching } = history.actions

export const selectHistory: TSelector<TInit> = (state) => state.history

export default history.reducer
