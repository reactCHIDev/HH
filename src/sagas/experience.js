import { put, takeEvery, delay } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import {
  createExperienceReq,
  updateExperienceReq,
  getExperiencesByDateReq,
  getExperienceByIdReq,
} from 'api/requests/Experience'
import { removeKey } from '../utils/localStorage'

import {
  CREATE_EXPERIENCE_REQUESTING,
  CREATE_EXPERIENCE_SUCCESS,
  CREATE_EXPERIENCE_ERROR,
  UPDATE_EXPERIENCE_REQUESTING,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_ERROR,
  GET_EXPERIENCE_BY_DATE_REQUESTING,
  GET_EXPERIENCE_BY_DATE_SUCCESS,
  GET_EXPERIENCE_BY_DATE_ERROR,
  GET_EXPERIENCE_BY_ID_REQUESTING,
  GET_EXPERIENCE_BY_ID_SUCCESS,
  GET_EXPERIENCE_BY_ID_ERROR,
} from '../actions/constants'

function* createExperienceSaga({ payload }) {
  try {
    yield createExperienceReq(payload)
    yield put({ type: CREATE_EXPERIENCE_SUCCESS })
    removeKey('addExperience')
    yield put(replace('/experience_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_EXPERIENCE_ERROR, error: error.response.data.error })
    }
  }
}

function* updateExperienceSaga({ payload }) {
  try {
    yield updateExperienceReq(payload)
    yield put({ type: UPDATE_EXPERIENCE_SUCCESS })
    removeKey('addExperience')
    yield put(replace('/experience_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_EXPERIENCE_ERROR, error: error.response.data.error })
    }
  }
}

function* getExperiencesByDateSaga({ payload }) {
  try {
    const response = yield getExperiencesByDateReq(payload)
    yield put({ type: GET_EXPERIENCE_BY_DATE_SUCCESS, payload: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_BY_DATE_ERROR, error: error.response.data.error })
    }
  }
}

function* getExperienceByIdSaga({ payload }) {
  try {
    const response = yield getExperienceByIdReq(payload)
    yield put({ type: GET_EXPERIENCE_BY_ID_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_BY_ID_ERROR, error: error.response.data.error })
    }
  }
}

/*

function* updateProductSaga({ payload }) {
  try {
    yield updateProductReq(payload)
    yield put(updateProductSuccess())
    removeKey('addProduct')
    yield put(replace('/product_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put(updateProductError())
    }
  }
}

function* getProductInfoSaga({ id }) {
  try {
    const response = yield getProductInfoReq(id)
    yield put({ type: GET_PRODUCT_INFO_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_INFO_ERROR, error: error.response.data.error })
    }
  }
}

function* toggleProductStatusSaga({ payload }) {
  try {
    yield toggleProductStatus({ id: payload })
    yield put({ type: 'GET_MY_PRODUCT_LIST_REQUESTING' })
  } catch (error) {
    if (error.response) {
      yield put({ type: TOGGLE_PRODUCT_STATUS_ERROR, error: error.response.data.error })
    }
  }
}

function* duplicateProductSaga({ payload }) {
  try {
    yield duplicate(payload)
    yield put({ type: DUPLICATE_PRODUCT_SUCCESS })
    yield delay(3000)
    yield put({ type: 'RESET_DUPLICATE_SUCCESS' })
    yield put(replace('/product_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: DUPLICATE_PRODUCT_ERROR, error: error.response.data.error })
    }
  }
} */

function* accountWatcher() {
  yield takeEvery(CREATE_EXPERIENCE_REQUESTING, createExperienceSaga)
  yield takeEvery(UPDATE_EXPERIENCE_REQUESTING, updateExperienceSaga)
  yield takeEvery(GET_EXPERIENCE_BY_DATE_REQUESTING, getExperiencesByDateSaga)
  yield takeEvery(GET_EXPERIENCE_BY_ID_REQUESTING, getExperienceByIdSaga)
}

export default accountWatcher
