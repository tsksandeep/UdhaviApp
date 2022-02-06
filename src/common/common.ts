import { RequestsMap } from '../store/reducers/updateRequests';
import { VolunteersMap } from '../store/reducers/updateVolunteers';

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
