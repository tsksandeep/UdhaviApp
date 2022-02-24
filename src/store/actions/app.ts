import * as Types from '../types/app';
import { updateRequests } from './updateRequests';
import { getExistingRequests } from '../shared/shared';
import { RequestForm } from '../reducers/modal/app.modal';
import { UserData } from '../../firebase/model';

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

const updateRequestList = (payload: RequestForm[]) => ({
  type: Types.UPDATE_REQUEST_LIST,
  payload,
});

const setInitialRequests = (phoneNumber: string) => async (dispatch: any) => {
  const existingRequests = await getExistingRequests(phoneNumber);
  dispatch(updateRequestList(existingRequests));
};
const updateUserData = (payload: UserData) => ({
  type: Types.UPDATE_USER_DATA,
  payload,
});

export {
  changeAppLoading,
  createRequestForm,
  updateShowCurrentLocationFlag,
  setInitialRequests,
  updateUserData,
};
