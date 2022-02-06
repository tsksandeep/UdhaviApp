import { Alert, Linking, Platform } from 'react-native';
import { RequestsMap } from '../store/reducers/updateRequests';
import { VolunteersMap } from '../store/reducers/updateVolunteers';

export const callNumber = async (phone: string) => {
  var phoneNumber =
    Platform.OS !== 'android' ? `telprompt:${phone}` : `tel:${phone}`;

  var supported = await Linking.canOpenURL(phoneNumber);
  if (!supported) {
    Alert.alert('Phone number is not available');
    return;
  }

  return Linking.openURL(phoneNumber);
};

export const getHeaderCountInfo = async (
  entityMap: RequestsMap | VolunteersMap,
  entityId: string,
  getEntityByIdCallback: Function,
) => {
  let entity = await getEntityByIdCallback(entityId);
  let assignedCount = entity.AssignedTo
    ? Object.keys(entity.AssignedTo).length.toString()
    : 0;
  let availableCount = Object.values(entityMap).length;

  return { assignedCount: assignedCount, availableCount: availableCount };
};
