import axios, { AxiosInstance } from 'axios'
import { isClient } from '@/utils/isClient'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { setPageError, setModalError } from '@/store/error'
import { logout } from '@/store/auth'
import { authToken } from '@/browserApi/authToken'
import { refreshToken } from '@/browserApi/refreshToken'
import { TStore } from '@/store'
import { ErrorStatus } from '@/types/error'

let store = {} as TStore

export const injectStore = (_store: TStore) => {
  store = _store
}

const baseURL = `${process.env.API_REST_URL}/`
const timeout = Number(process.env.API_REST_TIMEOUT)

const hasModalError = (status: number) => {
  const mainErrors = [
    ErrorStatus.Validation,
    ErrorStatus.Message,
    ErrorStatus.Unauthorized,
    ErrorStatus.NotFound
  ]
  const hasServerError = status >= ErrorStatus.Server
  return !mainErrors.includes(status) && !hasServerError
}

export const api: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

// refresh token
const refreshAuthLogic = async () => {
  const token = refreshToken.get() || ''

  return axios
    .post(`${baseURL}auth/refresh-token`, { refreshToken: token })
    .then(({ data }) => {
      const { tokens } = data
      authToken.set(tokens.accessToken)
      refreshToken.set(tokens.refreshToken)
      return Promise.resolve()
    })
    .catch((e) => {
      if (!axios.isAxiosError(e) || !e.response) return
      const { status, data } = e.response

      if (status !== ErrorStatus.Unauthorized) {
        store.dispatch(setModalError(data.message))
        return
      }

      store.dispatch(logout())
      return Promise.reject(e)
    })
}

// request hendler
api.interceptors.request.use((request) => {
  const req = request
  const token = authToken.get()

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

// response hendler
api.interceptors.response.use(
  (response) =>
    // do sometging
    response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        response: {
          status: null,
          data: {},
          canceled: axios.isCancel(error)
        }
      })
    }

    const { status, data } = error.response

    if (isClient() && status >= ErrorStatus.Server) {
      store.dispatch(setPageError(ErrorStatus.Server))
    }

    if (isClient() && status === ErrorStatus.NotFound) {
      store.dispatch(setPageError(ErrorStatus.NotFound))
    }

    if (isClient() && hasModalError(status) && data.message) {
      store.dispatch(setModalError(data.message))
    }

    return Promise.reject(error)
  }
)

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [ErrorStatus.Unauthorized]
})
