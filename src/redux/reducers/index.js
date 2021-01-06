import { combineReducers } from 'redux';

import user from './user';
import config from './config';
import { connectRouter } from 'connected-react-router';
import { history } from '../index';
export default (asyncReducers) =>
  combineReducers({
    user,
    config,
    router: connectRouter(history),
    ...asyncReducers,
  });
