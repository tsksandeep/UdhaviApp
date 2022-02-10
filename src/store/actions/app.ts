import * as Types from '../types/app';
import { RequestForm } from '../reducers/requestForm';

const changeAppLoading = (payload: boolean) => ({
  type: Types.IS_APP_LOADING,
  payload,
});

const createRequestForm = (payload: RequestForm) => ({
  type: Types.CREATE_REQUEST_FORM,
  payload,
});

const updateShowCurrentLocationFlag = (payload: boolean) => ({
  type: Types.SHOW_CURRENT_LOCATION,
  payload,
});

export { changeAppLoading, createRequestForm, updateShowCurrentLocationFlag };
