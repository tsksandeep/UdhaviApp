import * as Types from '../types/app';
import { getExistingRequests } from '../shared/shared';
import { RequestForm } from '../reducers/modal/app.modal';
import { RequestData, UserData, VolunteerData } from '../../firebase/model';

const changeAppLoading = (payload: boolean) => ({
  type: Types.IS_APP_LOADING,
  payload,
});

const createRequestForm = (payload: RequestForm) => ({
  type: Types.CREATE_REQUEST_FORM,
  payload,
});

const updateRequestsMap = (payload: Map<string, RequestData>) => ({
  type: Types.UPDATE_REQUESTS_MAP,
  payload,
});

const setInitialRequests = (phoneNumber: string) => async (dispatch: any) => {
  const existingRequests = await getExistingRequests(phoneNumber);
  dispatch(updateRequestsMap(existingRequests));
};

const updateVolunteersMap = (payload: Map<string, VolunteerData>) => ({
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

export {
  changeAppLoading,
  createRequestForm,
  setInitialRequests,
  updateUserData,
  updateRequestsMap,
  updateVolunteersMap,
  updateRequestAddress,
};
