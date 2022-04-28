import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector, TAsyncAction } from '@/store'
import { mockNotifications } from '../mock-data/notifications'

export type TNotification = {
  id: number
  type: 'error' | 'success' | 'warning'
  title: string
  message: string
  date: number
  unread?: boolean
}

export type TInit = {
  fetching: boolean
  notifications: TNotification[]
}

export const init: TInit = {
  fetching: false,
  notifications: mockNotifications
}

const notifications = createSlice({
  name: 'notifications',
  initialState: init,
  reducers: {
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    reset: () => init
  }
})

export const { setFetching } = notifications.actions

export const selectNotifications: TSelector<TInit> = (state) => state.notifications

export const selectUnread = createSelector(selectNotifications, ({ notifications }) =>
  notifications.filter((item) => item.unread)
)

export const selectorHasUnread = createSelector(
  selectNotifications,
  ({ notifications }) => notifications.some((item) => item.unread)
)

export default notifications.reducer

export const sendUnread = (): TAsyncAction => async (dispatch, getState) => {
  try {
    const { notifications } = getState().notifications
    const unreadNotification = notifications.reduce(
      (result: number[], item: TNotification) => {
        if (item.unread) {
          result.push(item.id)
        }
        return result
      },
      []
    )
    // eslint-disable-next-line no-console
    console.log(unreadNotification)
    dispatch(setFetching(true))
  } catch (e) {
    dispatch(setFetching(false))
  }
}
