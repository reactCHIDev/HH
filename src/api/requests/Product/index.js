import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createProductReq = (data) => apiClient.post(PATHS.createProduct, { data })
export const getProductInfoReq = (id) => apiClient.get(PATHS.getProductInfo + id)
