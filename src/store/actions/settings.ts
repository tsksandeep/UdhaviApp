import * as Types from '../types/settings';
import { SettingsInfo } from '../reducers/settings';

const updateSettingsInfo = (payload: SettingsInfo) => ({
  type: Types.UPDATE_SETTINGS_INFO,
  payload,
});

export { updateSettingsInfo };
