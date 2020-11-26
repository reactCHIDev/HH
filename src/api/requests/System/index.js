import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getSpecialityTags = () => apiClient.get(PATHS.getSpecialityTags)
