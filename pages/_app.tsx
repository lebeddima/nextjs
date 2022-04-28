import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { InitUser } from '@/permissions/InitUser'
import { injectStore } from '@/api/api'
import '@/styles/global.scss'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <InitUser />
    <Component {...pageProps} />
  </Provider>
)

export default MyApp
