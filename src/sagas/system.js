import { put, takeEvery, delay } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import { getSpecialityTags } from 'api/requests/System'

import {
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
} from '../actions/constants'

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

function* accountWatcher() {
  yield takeEvery(GET_SPECIALITY_TAGS_REQUESTING, getSpecialityTagsSaga)
}

export default accountWatcher
