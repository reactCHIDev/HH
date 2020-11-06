import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getProductTypes = () => apiClient.get(PATHS.getProductTypes)
export const getProductTypesReq = () => apiClient.get(PATHS.getProductTypes)
