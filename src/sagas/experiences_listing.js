import { put, takeEvery } from 'redux-saga/effects'
import { getMyExperiencesListReq } from 'api/requests/ExperiencesListing'

import {
  GET_MY_EXPERIENCES_LIST_REQUESTING,
  GET_MY_EXPERIENCES_LIST_SUCCESS,
  GET_MY_EXPERIENCES_LIST_ERROR,
} from '../actions/constants'

function* getMyExperiencesListSaga() {
  try {
    const response = yield getMyExperiencesListReq()
    yield put({ type: GET_MY_EXPERIENCES_LIST_SUCCESS, data: response.data.experiences })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_MY_EXPERIENCES_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* listingWatcher() {
  yield takeEvery(GET_MY_EXPERIENCES_LIST_REQUESTING, getMyExperiencesListSaga)
}

export default listingWatcher
