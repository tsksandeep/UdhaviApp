import * as Types from '../types/requestSelection';

const updateRequestSelection = (payload: string) => ({
  type: Types.UPDATE_REQUEST_SELECTION,
  payload,
});

export { updateRequestSelection };
