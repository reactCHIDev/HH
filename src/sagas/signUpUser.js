import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from 'actions/constants'
import { signUpUser } from 'api/requests/Auth/index'

function* signUpProcess({ credentials }) {
  try {
    yield signUpUser(credentials)
    yield put(push('/login'))
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

export default function* signUp() {
  yield takeEvery(SIGNUP_REQUESTING, signUpProcess)
}
