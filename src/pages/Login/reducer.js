import { actionTypes } from './action';

const defaultState = {
  isAuthenticated: false,
  isAuthRequesting: false,
  status: '',
  data: null,
  error: null,
  isRequesting: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        ...state,
        isAuthenticated: false,
        isRequesting: true,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isRequesting: false,
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        isRequesting: false,
      };
    }
    case actionTypes.REGISTER: {
      return {
        ...state,
        isAuthenticated: false,
        isRequesting: true,
      };
    }
    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    case actionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    default:
      return state;
  }
};
