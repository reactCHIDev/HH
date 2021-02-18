import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createExperienceReq = (data) => apiClient.post(PATHS.createExperience, { data })
