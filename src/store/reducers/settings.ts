import * as Types from '../types/settings';

export interface Action {
  payload: any;
  type: string;
}

export interface SettingsInfo {
  hideMap: boolean;
  hideDetails: boolean;
  hideRequests: boolean;
  hideVolunteers: boolean;
  defaultType: string;
  defaultViewMode: string;
}

export interface SettingsInitialState {
  settingsInfo: SettingsInfo;
}

export const initialState: SettingsInitialState = {
  settingsInfo: {
    hideMap: false,
    hideDetails: false,
    hideRequests: false,
    hideVolunteers: false,
    defaultType: 'showAll',
    defaultViewMode: 'showAll',
  },
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_SETTINGS_INFO:
      return { ...state, settingsInfo: payload };
    default:
      return state;
  }
};
export default reducer;
