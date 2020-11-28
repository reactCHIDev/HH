import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getProductTypesReq = () => apiClient.get(PATHS.getProductTypes)
export const getServiceTags = () => apiClient.get(PATHS.getServiceTags)
export const getSpecialityTags = () => apiClient.get(PATHS.getSpecialityTags)
export const getProductTagsReq = () => apiClient.get(PATHS.getProductTags)
export const getCitiesReq = () => apiClient.get(PATHS.getCities)
