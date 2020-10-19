import { SET_CONNECTION_STATE } from 'actions/constants'

export default (connectionState) => ({
  type: SET_CONNECTION_STATE,
  connectionState,
})
