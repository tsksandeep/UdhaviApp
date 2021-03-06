import { combineReducers } from 'redux';
import app from './app';
import request from './requestForm';
import settings from './settings';
import requestFilter from './requestFilter';
import volunteerFilter from './volunteerFilter';
import pendingSelection from './pendingSelection';
import requestSelection from './requestSelection';
import volunteerSelection from './volunteerSelection';
import assignmentOrReleaseSummary from './assignmentOrReleaseSummary';

const rootReducer = combineReducers({
  app,
  request,
  settings,
  requestFilter,
  volunteerFilter,
  pendingSelection,
  requestSelection,
  volunteerSelection,
  assignmentOrReleaseSummary,
});

export default rootReducer;
