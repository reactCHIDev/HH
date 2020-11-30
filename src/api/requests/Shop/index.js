import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const isShopExist = (id) => apiClient.get(PATHS.isShopExist + id)
