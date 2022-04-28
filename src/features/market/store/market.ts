import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TSelector } from '@/store'
import { mockedMarketData, mockedCardsData } from '../mockedData'
import { TMarketTab } from '../types'

export type TInit = {
  fetching: boolean
  marketTab: TMarketTab
  marketData: typeof mockedMarketData
  currencyData: typeof mockedCardsData
}

export const init: TInit = {
  fetching: false,
  marketTab: 'All',
  marketData: mockedMarketData,
  currencyData: mockedCardsData
}

const market = createSlice({
  name: 'market',
  initialState: init,
  reducers: {
    setFetching(state, action: PayloadAction<TInit['fetching']>) {
      state.fetching = action.payload
    },
    setMarketTab(state, action: PayloadAction<TInit['marketTab']>) {
      state.marketTab = action.payload
    },
    setMarketData(state, action: PayloadAction<TInit['marketData']>) {
      state.marketData = action.payload
    },
    setCurrencyData(state, action: PayloadAction<TInit['currencyData']>) {
      state.currencyData = action.payload
    },
    reset: () => init
  }
})

export const { reset, setFetching, setMarketTab, setMarketData, setCurrencyData } =
  market.actions

export const selectMarket: TSelector<TInit> = (state) => state.market

export const selectMarketData = createSelector(
  [selectMarket],
  ({ marketData, marketTab }) => {
    if (marketTab === 'Favorites') {
      return marketData.filter((item) => item.isFavorite)
    }
    return marketData
  }
)

export const selectMarketTab = createSelector(selectMarket, (market) => market.marketTab)

export const selectCurrencyData = createSelector(
  selectMarket,
  (market) => market.currencyData
)

export default market.reducer
