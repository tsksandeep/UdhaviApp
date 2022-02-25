import * as Types from '../types/app';
import { getExistingRequests } from '../shared/shared';
import { RequestForm } from '../reducers/modal/app.modal';
import { UserData } from '../../firebase/model';
import { RequestsMap, VolunteersMap } from '../reducers/app';

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

const updateRequestsMap = (payload: RequestsMap) => ({
  type: Types.UPDATE_REQUESTS_MAP,
  payload,
});

const setInitialRequests = (phoneNumber: string) => async (dispatch: any) => {
  const existingRequests = await getExistingRequests(phoneNumber);
  dispatch(updateRequestsMap(existingRequests));
};

const updateVolunteersMap = (payload: VolunteersMap) => ({
  type: Types.UPDATE_VOLUNTEERS_MAP,
  payload,
});

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
  updateRequestsMap,
  updateVolunteersMap,
};
