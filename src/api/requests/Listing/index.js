import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getMyProductListReq = (filters) =>
  apiClient.get(
    `/v1/product/list_my_products?startIndex=0&productTypeIds=1,2&productCategoryIds=1,3&sort=title+desc,rating+desc,status+desc,quantity+desc,available+desc`,
  )
