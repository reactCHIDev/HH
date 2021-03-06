/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import apiClient from 'utils/apiClient'

export const getMyProductListReq = (filters) =>
  apiClient.get(
    `/v1/product/list_my_products?startIndex=0&productTypeIds=1,2,3,4&productCategoryIds=1,4,14,2,5,7,8,9,6,10,11,12,13,17,15,16&sort=title+desc,rating+desc,status+desc,quantity+desc,available+desc`,
  )
