import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  GET_USER_BY_NAME,
  SIGNUP_ERROR,
} from 'actions/constants'
import { getUserByName, signUpUser } from 'api/requests/Auth/index'

function* signUpProcess({ credentials }) {
  try {
    yield signUpUser(credentials)
    yield put(push('/login'))
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

function* getUserByNameSaga({ name }) {
  try {
    const user = yield getUserByName(name)
    yield put({ type: 'QWEQWE', user: user.data.profileName })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

export default function* signUp() {
  yield takeEvery(SIGNUP_REQUESTING, signUpProcess)
  yield takeEvery(GET_USER_BY_NAME, getUserByNameSaga)
}
