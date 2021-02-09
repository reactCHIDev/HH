import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUnreviewedProductReq = () => apiClient.get(PATHS.unreviewedProduct)
export const createProductReviewReq = (data) => apiClient.post(PATHS.createProductReview, { data })
