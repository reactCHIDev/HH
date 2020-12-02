import { put, takeEvery, delay } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import {
  getProductTypesReq,
  getServiceTags,
  getSpecialityTags,
  getProductTagsReq,
  getCitiesReq,
  getCountriesReq,
} from 'api/requests/System'

import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
  GET_SERVICE_TAGS_REQUESTING,
  GET_SERVICE_TAGS_SUCCESS,
  GET_SERVICE_TAGS_ERROR,
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
  GET_PRODUCT_TAGS_REQUESTING,
  GET_PRODUCT_TAGS_SUCCESS,
  GET_PRODUCT_TAGS_ERROR,
  GET_CITIES_REQUESTING,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_COUNTRIES_REQUESTING,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
} from '../actions/constants'

function* getProductTypeSaga() {
  try {
    const response = yield getProductTypesReq()
    // const list = yield getMyProductListReq()
    yield put({ type: GET_PRODUCT_TYPES_SUCCESS, data: response.data })
    // yield put({ type: GET_MY_PRODUCT_LIST_REQUESTING })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TYPES_ERROR, error: error.response.data.error })
    }
  }
}

function* getServiceTagsSaga() {
  try {
    const response = yield getServiceTags()
    yield put({ type: GET_SERVICE_TAGS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_SERVICE_TAGS_ERROR, error: error.response.data.error })
    }
  }
}

function* getSpecialityTagsSaga() {
  try {
    const response = yield getSpecialityTags()
    yield put({ type: GET_SPECIALITY_TAGS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_SPECIALITY_TAGS_ERROR, error: error.response.data.error })
    }
  }
}

function* getProductTagsSaga() {
  try {
    const response = yield getProductTagsReq()
    yield put({ type: GET_PRODUCT_TAGS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TAGS_ERROR, error: error.response.data.error })
    }
  }
}

function* getCitiesSaga() {
  try {
    const response = yield getCitiesReq()
    yield put({ type: GET_CITIES_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_CITIES_ERROR, error: error.response.data.error })
    }
  }
}

function* getCountriesSaga() {
  try {
    const response = yield getCountriesReq()
    yield put({ type: GET_COUNTRIES_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_COUNTRIES_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_PRODUCT_TYPES_REQUESTING, getProductTypeSaga)
  yield takeEvery(GET_SERVICE_TAGS_REQUESTING, getServiceTagsSaga)
  yield takeEvery(GET_SPECIALITY_TAGS_REQUESTING, getSpecialityTagsSaga)
  yield takeEvery(GET_PRODUCT_TAGS_REQUESTING, getProductTagsSaga)
  yield takeEvery(GET_CITIES_REQUESTING, getCitiesSaga)
  yield takeEvery(GET_COUNTRIES_REQUESTING, getCountriesSaga)
}

export default accountWatcher
