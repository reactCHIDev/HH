import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createExperienceReq = (data) => apiClient.post(PATHS.createExperience, { data })
export const updateExperienceReq = (data) => apiClient.patch(PATHS.updateExperience, { data })
export const getExperiencesByDateReq = (data) => apiClient.get(PATHS.getExperiencesByDate + data)
export const getExperienceByIdReq = (data) => {
  return apiClient.get(PATHS.getExperienceById + data)
}
export const getBookingByDateReq = (id, date) =>
  apiClient.get(PATHS.getBookingByDate + id + '/bookings?date=' + date)

export const createPublicBookingReq = (data) => apiClient.post(PATHS.createPublicBooking, { data })

export const getExperienceReviews = () => apiClient.get(PATHS.experienceReviews)
export const getFoodmakerExperiencesReviews = () => apiClient.get(PATHS.foodmakerExperiencesReviews)
export const getFMBookingHistory = () => apiClient.get(PATHS.fmBookingHistory)
