import { takeEvery, put } from 'redux-saga/effects'
import { ACTION_TEST, SET_TEST_DATA } from 'actions/constants'
import { getSuperAdmin } from 'api/requests/Auth/index'

/* function* setTestData() {
  try {
    yield put({
      type: SET_TEST_DATA,
      payload: 'successful',
    })
  } catch (error) {
    throw new Error('error')
  }
} */

function* queryTestData() {
  console.log('saga')
  try {
    const response = yield getSuperAdmin()
    console.log('res', response.data)
    yield put({ type: 'SET_TEST_DATA', payload: response.data })
  } catch (error) {
    yield put({ type: 'ERROR' })
  }
}

export default function* profile() {
  // yield takeEvery(ACTION_TEST, setTestData)
  yield takeEvery('QTEST', queryTestData)
}
