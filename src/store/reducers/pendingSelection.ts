import * as Types from '../types/pendingSelection';

export interface Action {
  payload: any;
  type: string;
}

interface AssignedAndAvailable {
  assigned: {};
  available: {};
}

export interface PendingSelection {
  request: AssignedAndAvailable;
  volunteer: AssignedAndAvailable;
  all: AssignedAndAvailable;
}

export interface PendingSelectionInitialState {
  pendingSelection: PendingSelection;
}

export const initialPendingSelection: PendingSelection = {
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
};

export const initialState: PendingSelectionInitialState = {
  pendingSelection: initialPendingSelection,
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
