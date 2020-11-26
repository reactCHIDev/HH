import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUserAccount = (id) => apiClient.get(PATHS.getUserAccount + id)
export const getUserByHHLink = (link) => apiClient.get(PATHS.getUserByHHLink + link)
export const updateSettings = (data) => apiClient.patch(PATHS.updateSettings, { data })
export const confirmEmailUpdate = (data) => apiClient.patch(PATHS.confirmEmailUpdate, { data })
export const updatePhotoName = (data) => apiClient.patch(PATHS.updatePhotoName, { data })
export const getSpecialityTags = () => apiClient.get(PATHS.getSpecialityTags)

//
//
//
//
//
//
// ===========================================================

/*
export const getProfileImages = () => apiClient.get(PATHS.profileImages)
export const uploadProfileImages = (data) => apiClient.post(PATHS.profileImages, { data })
export const updateProfileImage = (data, id) => apiClient.put(PATHS.profileImagesById(id), { data })
export const deleteProfileImage = (id) => apiClient.delete(PATHS.profileImagesById(id))

export const uploadFooterImages = (data) => apiClient.post(PATHS.footerImages, { data })
export const deleteFooterImage = () => apiClient.delete(PATHS.footerImages)

export const getAllUserDetails = (id) => apiClient.get(PATHS.userAllDetails(id))
export const addworkDetails = (data) => apiClient.post(PATHS.workDetails, { data })
export const addEducationDetails = (data) => apiClient.post(PATHS.educationDetails, { data })
export const addLocationDetails = (data) => apiClient.post(PATHS.locationDetails, { data })
export const addRelationsDetails = (data) => apiClient.post(PATHS.relationsDetails, { data })

export const getUserDetailsInformation = (id) => apiClient.get(PATHS.detailsById(id))
export const updateUserDetailsInformation = (data, id) =>
  apiClient.post(PATHS.detailsById(id), { data })
export const deleteUserDetailsInformation = (id) => apiClient.delete(PATHS.detailsById(id))

export const getUsersStories = (id) => apiClient.get(PATHS.usersStories(id))
export const getUsersReactions = (id) => apiClient.get(PATHS.usersReactions(id))
export const getUsersConnections = (id) => apiClient.get(PATHS.usersConnections(id))

export const linkAlfaAndFB = (data) => apiClient.post(PATHS.linkFBAndAlfaAccounts, { data })
export const unlinkAlfaAndFB = () => apiClient.delete(PATHS.linkFBAndAlfaAccounts)
*/
