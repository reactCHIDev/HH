import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getProductTypesReq = () => apiClient.get(PATHS.getProductTypes)
export const getMyProductListReq = (filters) =>
  apiClient.get(
    `/v1/product/list_my_products?startIndex=0&productTypeIds=0,1,2,3,4&productCategoryIds=0,1,2,3,4,5,6&sort=title+desc,rating+desc,status+desc,quantity+desc,available+desc`,
  )
