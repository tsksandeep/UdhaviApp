import { combineReducers } from 'redux';
import app from './app';
import request from './request';
import settings from './settings';

const rootReducer = combineReducers({
  app,
  request,
  settings,
});

export default rootReducer;
