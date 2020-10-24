import axios from 'axios'
import { getItem } from 'utils/localStorage'

let baseEndpoint = ''
let temporaryEndpoint = ''

const getBaseHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'x-api-key': process.env.REACT_APP_X_API_KEY,
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

  const response = await axios.request(config)
  return response
}

export default {
  get: (url, options) => callApi(url, { ...options, method: 'GET' }),
  post: (url, options) => callApi(url, { ...options, method: 'POST' }),
  put: (url, options) => callApi(url, { ...options, method: 'PUT' }),
  delete: (url, options) => callApi(url, { ...options, method: 'DELETE' }),
  patch: (url, options) => callApi(url, { ...options, method: 'PATCH' }),
}
