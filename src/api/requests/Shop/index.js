import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const isShopExist = (id) => apiClient.get(PATHS.isShopExist + id)
export const updateShop = (data) => apiClient.patch(PATHS.updateShop, { data })
export const getShopByFoodmakerIdReq = (id) => apiClient.get(PATHS.getShopByFoodmakerId + id)
