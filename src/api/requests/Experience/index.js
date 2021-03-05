import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createExperienceReq = (data) => apiClient.post(PATHS.createExperience, { data })
export const updateExperienceReq = (data) => apiClient.patch(PATHS.updateExperience, { data })
export const getExperiencesByDateReq = (data) => apiClient.get(PATHS.getExperiencesByDate + data)
export const getExperienceByIdReq = (data) => {
  return apiClient.get(PATHS.getExperienceById + data)
}
export const getBookingByDateReq = (id, date) =>
  apiClient.get(`${PATHS.getBookingByDate + id}/bookings?date=${date}`)

export const createPublicBookingReq = (data) => apiClient.post(PATHS.createPublicBooking, { data })

export const getFMBookingHistory = ({ startIndex = 1, limit = 5 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.fmBookingHistory + params)
}

export const getFLBookingHistory = ({ startIndex = 1, limit = 5 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.flBookingHistory + params)
}

export const getPastFMBookingHistory = ({ startIndex = 1, limit = 5 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.pastFmBookingHistory + params)
}

export const getPastFLBookingHistory = ({ startIndex = 1, limit = 5 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `?${i}&${l}`
  return apiClient.get(PATHS.pastFlBookingHistory + params)
}

export const getExperienceReviews = ({ id, startIndex = 0, limit = 3 }) => {
  const i = `startIndex=${startIndex}`
  const l = `limit=${limit}`
  const params = `${id}?${i}&${l}`
  return apiClient.get(PATHS.experienceReviews + params)
}

export const getFoodmakerExperiencesReviews = () => {
  return apiClient.get(PATHS.foodmakerExperiencesReviews)
}

export const getFMBookingInfoByIdReq = (payload) => {
  return apiClient.get(PATHS.foodmakerBookingInfo + payload)
}
export const getFLBookingInfoByIdReq = (payload) => {
  return apiClient.get(PATHS.foodloverBookingInfo + payload)
}
