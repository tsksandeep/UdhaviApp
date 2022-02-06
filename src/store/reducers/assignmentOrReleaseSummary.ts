import * as Types from '../types/assignmentOrReleaseSummary';

export interface Action {
  payload: any;
  type: string;
}

export interface AssignmentOrReleaseSummaryInitialState {
  assignmentOrReleaseSummary: boolean;
}

export const initialState: AssignmentOrReleaseSummaryInitialState = {
  assignmentOrReleaseSummary: false,
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_ASSIGNMENT_OR_RELEASE_SUMMARY:
      return { ...state, assignmentOrReleaseSummary: payload };
    default:
      return state;
  }
};

export default reducer;
