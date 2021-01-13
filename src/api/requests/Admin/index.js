import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUsersListReq = () => apiClient.get(PATHS.getUsersList)
export const getShopsListReq = () => apiClient.get(PATHS.getShopsList)
