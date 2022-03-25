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

const updateRequestAddress = (payload: string) => ({
  type: Types.UPDATE_REQUEST_ADDRESS,
  payload,
});

const updateNotifications = (payload: Notification[]) => ({
  type: Types.UPDATE_NOTIFICATIONS,
  payload,
});

export {
  changeAppLoading,
  createRequestForm,
  setInitialRequests,
  updateUserData,
  updateRequestsMap,
  updateVolunteersMap,
  updateRequestAddress,
  updateNotifications,
};
