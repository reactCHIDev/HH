import { put, takeEvery } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import PATHS from 'api/paths'

import { getHomePageProductsReq, getFoodmakesForHomePageReq } from 'api/requests/Pages'
import { createProductSuccess, createProductError } from 'actions/product'

import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
  GET_PUBLIC_FOODMAKERS,
  GET_PUBLIC_FOODMAKERS_SUCCESS,
  GET_PUBLIC_FOODMAKERS_ERROR,
} from '../actions/constants'

function* getProductsSaga({ payload }) {
  try {
    const response = yield getHomePageProductsReq(payload)
    yield put({ type: GET_PUBLIC_PRODUCTS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PUBLIC_PRODUCTS_ERROR, error: error.response.data.error })
    }
  }
}

function* getFoodmakersSaga({ payload }) {
  try {
    const response = yield getFoodmakesForHomePageReq(payload)
    yield put({ type: GET_PUBLIC_FOODMAKERS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PUBLIC_FOODMAKERS_ERROR, error: error.response.data.error })
    }
  }
}

function* pagesWatcher() {
  yield takeEvery(GET_PUBLIC_PRODUCTS, getProductsSaga)
  yield takeEvery(GET_PUBLIC_FOODMAKERS, getFoodmakersSaga)
}

export default pagesWatcher
