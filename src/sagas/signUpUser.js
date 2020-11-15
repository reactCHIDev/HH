import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  GET_USER_BY_NAME,
  SIGNUP_ERROR,
  SIGNUP_FOODMAKER_REQUESTING,
  SIGNUP_FOODMAKER_SUCCESS,
  SIGNUP_FOODMAKER_ERROR,
} from 'actions/constants'
import { getUserByName, signUpUser, signUpFoodmaker } from 'api/requests/Auth'

function* signUpProcess({ credentials }) {
  try {
    yield signUpUser(credentials)
    yield put({ type: SIGNUP_SUCCESS })
    yield put(push('/login'))
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

function* signUpFoodmakerSaga({ credentials }) {
  const creds = { ...credentials }
  const { email } = creds
  const token = jwt.sign({ email }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: 3600 })
  const { url } = PATHS
  creds.registrationLink = `${url}/${token}`
  try {
    yield signUpFoodmaker(creds)
    yield put({ type: SIGNUP_FOODMAKER_SUCCESS })
  } catch (error) {
    console.log('%c   error   ', 'color: white; background: salmon;', error.response.data)
    yield put({ type: SIGNUP_FOODMAKER_ERROR, error: error.response.data })
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
  yield takeEvery(SIGNUP_FOODMAKER_REQUESTING, signUpFoodmakerSaga)
}
