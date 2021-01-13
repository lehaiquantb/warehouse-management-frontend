export const actionTypes = {
  IS_REQUESTING: 'IS_REQUESTING',
  IS_REQUESTING_SUCCESS: 'IS_REQUESTING_SUCCESS',
  IS_REQUESTING_FAILURE: 'IS_REQUESTING_FAILURE',
  IS_REQUESTED: 'IS_REQUESTED',
};

export function isRequesting() {
  return {
    type: actionTypes.IS_REQUESTING,
  };
}

export function isRequested() {
  return {
    type: actionTypes.IS_REQUESTED,
  };
}

export function isRequestingSuccess() {
  return {
    type: actionTypes.IS_REQUESTING_SUCCESS,
  };
}

export function isRequestingFailure() {
  return {
    type: actionTypes.IS_REQUESTING_FAILURE,
  };
}
