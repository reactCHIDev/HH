import { takeEvery, put } from 'redux-saga/effects'
import { ACTION_TEST, SET_TEST_DATA } from 'actions/constants'

function* setTestData() {
  try {
    yield put({
      type: SET_TEST_DATA,
      payload: 'successful',
    })
  } catch (error) {
    throw new Error('error')
  }
}

export default function* profile() {
  yield takeEvery(ACTION_TEST, setTestData)
}
