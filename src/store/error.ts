import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { ErrorStatus } from '@/types/error'

export type TRegisterList = {
  header: string
  id: number
  slug: string
}[]

export type TErrorPage = null | ErrorStatus.NotFound | ErrorStatus.Server

type TInit = {
  modalError: string
  inlineError: string
  errorPage: TErrorPage
}

const init: TInit = {
  modalError: '',
  inlineError: '',
  errorPage: null
}

const error = createSlice({
  name: 'error',
  initialState: init,
  reducers: {
    setModalError(state, action: PayloadAction<TInit['modalError']>) {
      state.modalError = action.payload
    },
    setPageError(state, action: PayloadAction<TInit['errorPage']>) {
      state.errorPage = action.payload
    },
    setInlineError(state, action: PayloadAction<TInit['inlineError']>) {
      state.inlineError = action.payload
    }
  }
})

export const { setModalError, setPageError, setInlineError } = error.actions
const errorReducer = error.reducer
export const selectError: TSelector<TInit> = (state) => state.error
export default errorReducer
