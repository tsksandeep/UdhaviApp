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

export function isAssignedToValid(obj: any) {
  return obj.AssignedTo && Object.keys(obj.AssignedTo).length > 0;
}

export function getAllVolunteersRemovePendingSelections(
  pendingSelection: PendingSelection,
) {
  return Object.keys(pendingSelection.volunteer.assigned);
}

export function getAllVolunteersAssignPendingSelections(
  pendingSelection: PendingSelection,
) {
  return Object.keys(pendingSelection.volunteer.available);
}

export function getAllRequestsRemovePendingSelections(
  pendingSelection: PendingSelection,
) {
  return Object.keys(pendingSelection.request.assigned);
}

export function getAllRequestsAssignPendingSelections(
  pendingSelection: PendingSelection,
) {
  return Object.keys(pendingSelection.request.available);
}

export async function assignSelectedVolunteersToRequest(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  requestId: string,
) {
  let volunteerIds = getAllVolunteersAssignPendingSelections(pendingSelection);
  assignVolunteersToRequest(
    actions,
    requests,
    volunteers,
    requestId,
    volunteerIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
}

export async function releaseSelectedVolunteersFromRequest(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  requestId: string,
) {
  let volunteerIds = getAllVolunteersRemovePendingSelections(pendingSelection);
  releaseVolunteersFromRequest(
    actions,
    requests,
    volunteers,
    requestId,
    volunteerIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
}

export async function releaseAllVolunteersFromRequest(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  requestId: string,
) {
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
}

export function assignSelectedRequestsToVolunteer(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  volunteerId: string,
) {
  let requestIds = getAllRequestsAssignPendingSelections(pendingSelection);
  assignRequestsToVolunteer(
    actions,
    requests,
    volunteers,
    volunteerId,
    requestIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
}

export function releaseSelectedRequestsFromVolunteer(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  pendingSelection: PendingSelection,
  volunteerId: string,
) {
  let requestIds = getAllRequestsRemovePendingSelections(pendingSelection);
  releaseRequestsFromVolunteer(
    actions,
    requests,
    volunteers,
    volunteerId,
    requestIds,
  );
  actions.updatePendingSelection(initialPendingSelection);
}

export async function releaseAllRequestsFromVolunteer(
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  volunteerId: string,
) {
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
}
