import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

// eslint-disable-next-line import/prefer-default-export
export const getFoodloverOrdersReq = (id) => apiClient.get(PATHS.getFoodmakerInfo + id)
