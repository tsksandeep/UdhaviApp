import { PendingSelection } from '../reducers/pendingSelection';
import * as Types from '../types/pendingSelection';

const updatePendingSelection = (payload: PendingSelection) => ({
  type: Types.UPDATE_PENDING_SELECTION,
  payload,
});

export { updatePendingSelection };
