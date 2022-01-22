import { combineReducers } from 'redux';
import app from './app';
import request from './requestForm';
import settings from './settings';
import requestFilter from './requestFilter';
import volunteerFilter from './volunteerFilter';
import updateRequests from './updateRequests';
import updateVolunteers from './updateVolunteers';

const rootReducer = combineReducers({
  app,
  request,
  settings,
  requestFilter,
  volunteerFilter,
  updateRequests,
  updateVolunteers,
});

export default rootReducer;
