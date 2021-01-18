import { put, takeEvery } from 'redux-saga/effects'
import { searchByProductsReq, searchByFoodmakersReq } from 'api/requests/Search'

import { SEARCH_REQUESTING, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/constants'

function* searchSaga({ data }) {
  try {
    const { searchType, dataForSearch } = data
    if (searchType === 'Products') {
      const { data: searchedData } = yield searchByProductsReq(dataForSearch)
      yield put({ type: SEARCH_SUCCESS, searchedData })
    }
    if (searchType === 'Foodmakers') {
      const { data: searchedData } = yield searchByFoodmakersReq(dataForSearch)
      yield put({ type: SEARCH_SUCCESS, searchedData })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: SEARCH_ERROR, error: error.response.data.error })
    }
  }
}

function* searchWatcher() {
  yield takeEvery(SEARCH_REQUESTING, searchSaga)
}

export default searchWatcher
