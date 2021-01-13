import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import loginApi from '../../api/loginApi';
import { history } from '../index';
import {
  actionTypes,
  authSuccess,
  authFailure,
  logoutSuccess,
  logoutFailure,
} from '../actions/user';
import { push } from 'connected-react-router';

function* auth() {
  try {
    const response = yield call(loginApi.auth);
    yield put(authSuccess(response));
    if (history.location.state && history.location.state.from) {
      yield put(push(history.location.state.from.pathname));
      //history.replace(history.location.state.from);
    } else yield put(push('/home'));
  } catch (e) {
    yield put(push('/login'));
    yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* logout({ email }) {
  try {
    const response = yield call(loginApi.logout, { email });
    yield put(logoutSuccess(response));
    yield put(push('/login'));
  } catch (e) {
    yield put(push('/home'));
    yield put(logoutFailure());
    console.log('we got error here', e);
  }
}

export default function* () {
  // while (true) {
  //   const action = yield take("check_auth");
  //   yield fork(checkAuth, action);
  // }
  yield takeEvery(actionTypes.AUTH, auth);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
