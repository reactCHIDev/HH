import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUnreviewedProductReq = () => apiClient.get(PATHS.unreviewedProduct)
