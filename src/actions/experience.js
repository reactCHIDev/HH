import { CREATE_EXPERIENCE_REQUESTING } from './constants'

export const createExperienceAC = (payload) => ({
  type: CREATE_EXPERIENCE_REQUESTING,
  payload,
})
