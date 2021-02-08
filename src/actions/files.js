import { DELETE_FILE_REQUEST } from 'actions/constants'

export default (fileName) => ({
  type: DELETE_FILE_REQUEST,
  payload: fileName,
})
