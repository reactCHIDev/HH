import { put, takeEvery } from 'redux-saga/effects'

import { getFavProductsReq, getFavExperiencesReq, getFavMakersReq } from 'api/requests/Bookmarks'

import {
  GET_FAV_PRODUCTS,
  GET_FAV_PRODUCTS_SUCCESS,
  GET_FAV_PRODUCTS_ERROR,
  GET_FAV_EXPERIENCES,
  GET_FAV_EXPERIENCES_SUCCESS,
  GET_FAV_EXPERIENCES_ERROR,
  GET_FAV_FOODMAKERS,
  GET_FAV_FOODMAKERS_SUCCESS,
  GET_FAV_FOODMAKERS_ERROR,
} from '../actions/constants'

function* getFavProductsSaga({ payload }) {
  try {
    const response = yield getFavProductsReq(payload)
    yield put({ type: GET_FAV_PRODUCTS_SUCCESS, data: response.data.products })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FAV_PRODUCTS_ERROR, error: error.response.data.error })
    }
  }
}

function* getFavExperiencesSaga({ payload }) {
  try {
    const response = yield getFavExperiencesReq(payload)
    yield put({ type: GET_FAV_EXPERIENCES_SUCCESS, data: response.data.experiences })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FAV_EXPERIENCES_ERROR, error: error.response.data.error })
    }
  }
}
function* getFavMakersSaga({ payload }) {
  try {
    const response = yield getFavMakersReq(payload)
    yield put({ type: GET_FAV_FOODMAKERS_SUCCESS, data: response.data.foodmakers })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FAV_FOODMAKERS_ERROR, error: error.response.data.error })
    }
  }
}

function* bookmarksWatcher() {
  yield takeEvery(GET_FAV_PRODUCTS, getFavProductsSaga)
  yield takeEvery(GET_FAV_EXPERIENCES, getFavExperiencesSaga)
  yield takeEvery(GET_FAV_FOODMAKERS, getFavMakersSaga)
}

export default bookmarksWatcher
