import {
  GET_MY_EXPERIENCES_LIST_REQUESTING,
  GET_MY_EXPERIENCES_LIST_SUCCESS,
  GET_MY_EXPERIENCES_LIST_ERROR,
  TOGGLE_EXPERIENCE_STATUS_REQUESTING,
} from './constants'

export const getMyExperiencesList = () => ({
  type: GET_MY_EXPERIENCES_LIST_REQUESTING,
})

export const getMyExperiencesListSuccess = (data) => {
  return {
    type: GET_MY_EXPERIENCES_LIST_SUCCESS,
    data,
  }
}

export const getMyExperiencesListError = (error) => ({
  type: GET_MY_EXPERIENCES_LIST_ERROR,
  error,
})

export const toggleExperienceStatusRequestAC = (payload) => ({
  type: TOGGLE_EXPERIENCE_STATUS_REQUESTING,
  payload,
})
