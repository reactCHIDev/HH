/* eslint-disable import/prefer-default-export */
import { SEARCH_REQUESTING, CLEAR_SEARCH_DATA } from './constants'

export const searchRequestingnAc = (data) => ({
  type: SEARCH_REQUESTING,
  data,
})

export const clearSearchDataAc = () => ({
  type: CLEAR_SEARCH_DATA,
})
