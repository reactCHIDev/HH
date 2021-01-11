/* eslint-disable import/prefer-default-export */
import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const createCharge = (data) => apiClient.post(PATHS.charge, { data })
export const createOrder = (data) => apiClient.post(PATHS.order, { data })
