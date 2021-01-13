import { actionTypes } from '../actions/config';

const defaultState = {
  isRequesting: false,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.IS_REQUESTING: {
      return {
        ...state,
        isRequesting: true,
      };
    }
    case actionTypes.IS_REQUESTING_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    case actionTypes.IS_REQUESTED: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    case actionTypes.IS_REQUESTING_FAILURE: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    default:
      return state;
  }
};
