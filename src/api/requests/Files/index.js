/* eslint-disable import/prefer-default-export */
import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const deleteFileReq = (fileName) =>
  apiClient.delete(`${PATHS.deleteFile + fileName}?source=message`)
