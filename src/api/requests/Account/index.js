import apiClient from 'utils/apiClient'
import axios from 'axios'

import PATHS from 'api/paths'

const dircall = async () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-api-key': '11edff01b8c5e3cfa0027fd313365f264b',
  }

  const request = await axios.get(
    'https://hungryhugger.wildwebart.com/api/v1/user/profile_name/SuperAdmin',
    { headers },
  )

  /* const request = await axios.request({
    url: 'https://hungryhugger.wildwebart.com/api/v1/city/list',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
       'x-api-key': '11edff01b8c5e3cfa0027fd313365f264b', 
      method: 'GET',
    },
  }) */
  console.log('inside dircall')
  return request
}

export const getSuperAdmin = () => {
  console.log('dircall')
  dircall()
}

/* export const getSuperAdmin = () => {
  console.log('get')
  apiClient.get(PATHS.superadmin)
} */

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
