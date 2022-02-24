import * as Types from '../types/app';
import { RequestForm } from '../reducers/requestForm';
import { updateRequests } from './updateRequests';
import { getExistingRequests } from '../shared/shared';

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

const setInitialRequests = (phoneNumber: string) => {
  // Fix thunk
  async (dispatch: any) => {
    const existingRequests = await getExistingRequests(phoneNumber);
    dispatch(updateRequests(existingRequests));
  };
};

export {
  changeAppLoading,
  createRequestForm,
  updateShowCurrentLocationFlag,
  setInitialRequests,
};
