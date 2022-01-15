import { combineReducers } from 'redux';
import app from './app';
import request from './request';

const rootReducer = combineReducers({
  app,
  request,
});

export default rootReducer;
