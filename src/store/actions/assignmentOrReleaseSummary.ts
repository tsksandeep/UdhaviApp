import * as Types from '../types/assignmentOrReleaseSummary';

const updateAssignmentOrReleaseSummary = (payload: boolean) => ({
  type: Types.UPDATE_ASSIGNMENT_OR_RELEASE_SUMMARY,
  payload,
});

export { updateAssignmentOrReleaseSummary };
