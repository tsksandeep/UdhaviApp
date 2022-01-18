import { combineReducers } from 'redux';
import app from './app';
import request from './request';
import settings from './settings';
import requestFilter from './requestFilter';
import volunteerFilter from './volunteerFilter';

const rootReducer = combineReducers({
  app,
  request,
  settings,
  requestFilter,
  volunteerFilter,
});

export default rootReducer;
