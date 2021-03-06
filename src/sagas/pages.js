import { put, takeEvery } from 'redux-saga/effects'
import { replace } from 'connected-react-router'

import PATHS from 'api/paths'

import {
  getHomePageProductsReq,
  getHomePageExperiencesReq,
  getFoodmakesForHomePageReq,
} from 'api/requests/Pages'
import { createProductSuccess, createProductError } from 'actions/product'
import { getUserByHHLink } from 'api/requests/Account'
import { getFoodmakerInfoByNameReq } from 'api/requests/foodmaker'
import { getShopByFoodmakerIdReq } from 'api/requests/Shop'

import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
  GET_PUBLIC_EXPERIENCES,
  GET_PUBLIC_EXPERIENCES_SUCCESS,
  GET_PUBLIC_EXPERIENCES_ERROR,
  GET_PUBLIC_FOODMAKERS,
  GET_PUBLIC_FOODMAKERS_SUCCESS,
  GET_PUBLIC_FOODMAKERS_ERROR,
  RESOLVE_FOODMAKER_DATA,
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

function* getExperiencesSaga({ payload }) {
  try {
    const response = yield getHomePageExperiencesReq(payload)
    console.log('%c   response   ', 'color: white; background: salmon;', response)
    yield put({ type: GET_PUBLIC_EXPERIENCES_SUCCESS, data: response.data.experiences })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PUBLIC_EXPERIENCES_ERROR, error: error.response.data.error })
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

function* resolveFoodmakerPageSaga({ url }) {
  try {
    const response = yield getUserByHHLink(url)
    const foodmaker = yield getFoodmakerInfoByNameReq(response.data.profileName)
    const shop = yield getShopByFoodmakerIdReq(foodmaker.data.id)
    yield put({
      type: 'FOODMAKER_PAGE_DATA',
      data: { foodmakerData: { ...foodmaker.data, userId: response.data.id }, shopData: shop.data },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: 'FOODMAKER_PAGE_ERROR', error: error.response.data.error })
    }
  }
}

function* pagesWatcher() {
  yield takeEvery(GET_PUBLIC_PRODUCTS, getProductsSaga)
  yield takeEvery(GET_PUBLIC_EXPERIENCES, getExperiencesSaga)
  yield takeEvery(GET_PUBLIC_FOODMAKERS, getFoodmakersSaga)
  yield takeEvery(RESOLVE_FOODMAKER_DATA, resolveFoodmakerPageSaga)
}

export default pagesWatcher
