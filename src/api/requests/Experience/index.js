import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createExperienceReq = (data) => apiClient.post(PATHS.createExperience, { data })
export const updateExperienceReq = (data) => apiClient.patch(PATHS.updateExperience, { data })
export const getExperiencesByDateReq = (data) => apiClient.get(PATHS.getExperiencesByDate + data)
