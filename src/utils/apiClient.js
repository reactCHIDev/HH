/* MODULES */
import axios from 'axios'
/* CASTOME MODULES */
import { getItem } from 'utils/localStorage'
import store from 'store'
import { NEW_LOGOUT, SET_CONNECTION_STATE } from 'actions/constants'

let baseEndpoint = ''
let temporaryEndpoint = ''

const getBaseHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
})

const getToken = () => {
  const accessToken = getItem('authorization-token')

  if (accessToken) {
    return { Authorization: accessToken }
  }

  return null
}

export const setBaseEndpoint = (ep) => {
  baseEndpoint = ep
}

export const setTemporaryEndpoint = (ep) => {
  temporaryEndpoint = ep
}

const callApi = async (url, { headers = {}, params = {}, data, ...restOptions }) => {
  const config = {
    url: temporaryEndpoint ? `${temporaryEndpoint}${url}` : `${baseEndpoint}${url}`,
    headers: { ...getBaseHeaders(), ...headers, ...getToken() },
    params: { ...params },
    data,

    ...restOptions,
  }

  temporaryEndpoint = ''

  if (restOptions.method === 'POST' && !config.data) {
    config.data = {}
  }

  axios.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch({ type: NEW_LOGOUT })
    }
  })

  // if (!navigator.onLine) {
  //   store.dispatch({ type: SET_CONNECTION_STATE, connectionState: false })
  //   return null
  // }

  const request = await axios.request(config)
  return request
}

export default {
  get: (url, options) => callApi(url, { ...options, method: 'GET' }),
  post: (url, options) => callApi(url, { ...options, method: 'POST' }),
  put: (url, options) => callApi(url, { ...options, method: 'PUT' }),
  delete: (url, options) => callApi(url, { ...options, method: 'DELETE' }),
}
