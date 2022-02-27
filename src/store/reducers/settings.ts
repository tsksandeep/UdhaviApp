import * as Types from '../types/settings';

export interface Action {
  payload: any;
  type: string;
}

export interface SettingsInfo {
  type: string;
  view: string;
}

export interface SettingsInitialState {
  settingsInfo: SettingsInfo;
}

export const initialState: SettingsInitialState = {
  settingsInfo: {
    type: 'all',
    view: 'all',
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
