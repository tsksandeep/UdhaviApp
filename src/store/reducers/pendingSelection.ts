import * as Types from '../types/pendingSelection';

export interface Action {
  payload: any;
  type: string;
}

interface AssignedAndAvailable {
  assigned: Array<string>;
  available: Array<string>;
}

export interface PendingSelection {
  request: AssignedAndAvailable;
  volunteer: AssignedAndAvailable;
  all: AssignedAndAvailable;
}

export interface PendingSelectionInitialState {
  pendingSelection: PendingSelection;
}

export const initialState: PendingSelectionInitialState = {
  pendingSelection: {
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
  },
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_PENDING_SELECTION:
      return { ...state, pendingSelection: payload };
    default:
      return state;
  }
};

export default reducer;
