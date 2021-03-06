import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUnreviewedProductReq = () => apiClient.get(PATHS.unreviewedProduct)
export const createProductReviewReq = (data) => apiClient.post(PATHS.createProductReview, { data })
export const getFlProductsReviewsReq = ({ startIndex = 1, limit = 6 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.getFlProductReviews + params)
}
export const getProductReviewsReq = ({ id, startIndex = 1, limit = 6 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `${id}?${i}&${l}`
  return apiClient.get(PATHS.getProductReviews + params)
}
export const getReviewsForProductsReq = ({ startIndex = 1, limit = 6 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.foodmakerProductsReviews + params)
}
