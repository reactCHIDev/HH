/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getMyExperiencesListReq = () =>
  apiClient.get(
    `/v1/experience/list_my_experiences?startIndex=0&limit=6&sort=title+desc,status+asc,updated_at+asc`,
  )
