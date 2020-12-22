import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getStripe = (data) => apiClient.post(PATHS.stripe, { data })
