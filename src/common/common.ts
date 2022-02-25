import { Alert, Linking, Platform } from 'react-native';
import { RequestData, VolunteerData } from '../firebase/model';
import { RequestsMap, VolunteersMap } from '../store/reducers/app';
import { PendingSelection } from '../store/reducers/pendingSelection';
import { getPendingSelection } from '../store/shared/shared';

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

export function isRequestAssignedToVolunteer(
  requestData: RequestData,
  volunteerId: string,
) {
  return (
    volunteerId &&
    requestData.assignedTo &&
    requestData?.assignedVolunteerIds?.includes(volunteerId)
  );
}

export function isVolunteerAssignedToRequest(
  volunteerData: VolunteerData,
  requestId: string,
) {
  return (
    requestId &&
    volunteerData.assignedTo &&
    volunteerData?.assignedRequestIds?.includes(requestId)
  );
}

export const getItemSubCategory = (
  pendingSelection: PendingSelection,
  selectedRequestId: string,
  selectedVolunteerId: string,
  category: string,
  entity: RequestData | VolunteerData,
) => {
  let sub = 'default';
  let isRequest = category == 'request';
  let isVolunteer = !isRequest;

  if (
    (isRequest && selectedRequestId == entity.id) ||
    (isVolunteer && selectedVolunteerId == entity.id)
  ) {
    sub = 'selected';
  } else if (
    getPendingSelection(pendingSelection, category, 'assigned', entity.id)
  ) {
    sub = 'pending_release';
  } else if (
    getPendingSelection(pendingSelection, category, 'available', entity.id)
  ) {
    sub = 'pending_assign';
  } else if (
    isRequest &&
    isRequestAssignedToVolunteer(entity as RequestData, selectedVolunteerId)
  ) {
    sub = 'assigned';
  } else if (
    isVolunteer &&
    isVolunteerAssignedToRequest(entity as VolunteerData, selectedRequestId)
  ) {
    sub = 'assigned';
  }

  return sub;
};

export const elapsedSecondsFromNow = (dateTime: number): number => {
  var now = new Date();
  var date = new Date(dateTime);
  return (now.getTime() - date.getTime()) / 1000;
};

export const secondsToHms = (seconds: number): string => {
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  if (d >= 1) return d + 'd';
  if (h >= 1) return h + 'h';
  if (m >= 1) return m + 'm';
  return s + 's';
};

export const sortByDate = (requests: RequestData[]): RequestData[] => {
  return requests.sort((d1, d2) => {
    return new Date(d2.date).getTime() - new Date(d1.date).getTime();
  });
};
