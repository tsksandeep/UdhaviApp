import {
  assignVolunteersToRequest,
  getRequestByID,
  releaseVolunteersFromRequest,
} from '../../firebase/requests';
import {
  assignRequestsToVolunteer,
  getVolunteerByID,
  releaseRequestsFromVolunteer,
} from '../../firebase/volunteers';
import {
  initialPendingSelection,
  PendingSelection,
} from '../reducers/pendingSelection';
import { RequestsMap } from '../reducers/updateRequests';
import { VolunteersMap } from '../reducers/updateVolunteers';

export const clearPendingSelection = (actions: any) => {
  actions.updatePendingSelection({
    request: {
      assigned: [],
      available: [],
    },
    volunteer: {
      assigned: [],
      available: [],
    },
    all: {
      assigned: [],
      available: [],
    },
  });
  actions.updateRequestSelection('');
  actions.updateVolunteerSelection('');
  actions.updateAssignmentOrReleaseSummary(false);
};

export const setPendingSelection = (
  pendingSelection: any,
  category: string,
  subCategory: string,
  requestId: string,
  requestValueToSet: boolean,
) => {
  if (pendingSelection?.[category]?.[subCategory]?.[requestId]) {
    if (!requestValueToSet) {
      delete pendingSelection[category][subCategory][requestId];
      return;
    }
    pendingSelection[category][subCategory][requestId] = {
      tag: requestValueToSet,
    };
  }
};

export const getPendingSelection = (
  pendingSelection: any,
  category: string,
  subCategory: string,
  requestId: string,
): boolean => {
  var tagValue = false;
  var requestValue = pendingSelection?.[category]?.[subCategory]?.[requestId];
  if (requestValue) {
    tagValue = requestValue ? requestValue.tag : false;
  }
  return tagValue;
};

export const isAssignedToValid = (obj: any) => {
  return obj.AssignedTo && Object.keys(obj.AssignedTo).length > 0;
};

export const getAllVolunteersRemovePendingSelections = (
  pendingSelection: PendingSelection,
) => {
  return Object.keys(pendingSelection.volunteer.assigned);
};

export const getAllVolunteersAssignPendingSelections = (
  pendingSelection: PendingSelection,
) => {
  return Object.keys(pendingSelection.volunteer.available);
};

export const getAllRequestsRemovePendingSelections = (
  pendingSelection: PendingSelection,
) => {
  return Object.keys(pendingSelection.request.assigned);
};

export const getAllRequestsAssignPendingSelections = (
  pendingSelection: PendingSelection,
) => {
  return Object.keys(pendingSelection.request.available);
};

export const assignSelectedVolunteersToRequest = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  requestId: string,
) => {
  let volunteerIds = getAllVolunteersAssignPendingSelections(pendingSelection);
  assignVolunteersToRequest(
    actions,
    requests,
    volunteers,
    requestId,
    volunteerIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
};

export const releaseSelectedVolunteersFromRequest = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  requestId: string,
) => {
  let volunteerIds = getAllVolunteersRemovePendingSelections(pendingSelection);
  releaseVolunteersFromRequest(
    actions,
    requests,
    volunteers,
    requestId,
    volunteerIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
};

export const releaseAllVolunteersFromRequest = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  requestId: string,
) => {
  var request = await getRequestByID(requestId);
  if (isAssignedToValid(request)) {
    let volunteerIds = Object.keys(request.AssignedTo);
    releaseVolunteersFromRequest(
      actions,
      requests,
      volunteers,
      requestId,
      volunteerIds,
    );
  }
  actions.updatePendingSelection(initialPendingSelection);
};

export const assignSelectedRequestsToVolunteer = (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  volunteerId: string,
) => {
  let requestIds = getAllRequestsAssignPendingSelections(pendingSelection);
  assignRequestsToVolunteer(
    actions,
    requests,
    volunteers,
    volunteerId,
    requestIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
};

export const releaseSelectedRequestsFromVolunteer = (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  volunteerId: string,
) => {
  let requestIds = getAllRequestsRemovePendingSelections(pendingSelection);
  releaseRequestsFromVolunteer(
    actions,
    requests,
    volunteers,
    volunteerId,
    requestIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
};

export const releaseAllRequestsFromVolunteer = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  volunteerId: string,
) => {
  var volunteer = await getVolunteerByID(volunteerId);
  if (isAssignedToValid(volunteer)) {
    let requestIds = Object.keys(volunteer.AssignedTo);
    releaseRequestsFromVolunteer(
      actions,
      requests,
      volunteers,
      volunteerId,
      requestIds,
    );
  }
  actions.updatePendingSelection(initialPendingSelection);
};
