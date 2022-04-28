import { createSelectorHook, useDispatch, useStore } from 'react-redux'
import { TRootState, TStore, TDispatch } from '@/store'

export const useRedux = (): [typeof useSelector, TDispatch, TStore] => {
  const useSelector = createSelectorHook<TRootState>()
  const dispatch = useDispatch()
  const store: TStore = useStore()

  return [useSelector, dispatch, store]
}
