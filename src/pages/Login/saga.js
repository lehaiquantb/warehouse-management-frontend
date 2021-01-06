import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import {
  actionTypes,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from './action';
import { authSuccess, authFailure } from '../../redux/actions/user';
import loginApi from '../../api/loginApi';
import { push } from 'connected-react-router';
import {
  notifFailureMes,
  notifSuccess,
} from '../../components/notification/Notification';

function* login({ email, password }) {
  try {
    const response = yield call(loginApi.login, { email, password });
    yield put(loginSuccess(response));
    yield put(authSuccess(response.user));
    yield put(push('/home'));
  } catch (e) {
    yield put(loginFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* register({ data }) {
  try {
    const response = yield call(loginApi.register, data);
    yield put(registerSuccess(response));
    notifSuccess('Đăng ký thành công, giờ bạn có thể đăng nhập');
  } catch (e) {
    yield put(registerFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.REGISTER, register);
}
