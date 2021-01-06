export const actionTypes = {
  AUTH: 'AUTH',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
};

export function auth() {
  return {
    type: actionTypes.AUTH,
  };
}

export function authSuccess(data) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: data,
  };
}

export function authFailure() {
  return {
    type: actionTypes.AUTH_FAILURE,
  };
}

export function logout(email) {
  return {
    type: actionTypes.LOGOUT,
    email,
  };
}

export function logoutSuccess(data) {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: data,
  };
}

export function logoutFailure() {
  return {
    type: actionTypes.LOGOUT_FAILURE,
  };
}
