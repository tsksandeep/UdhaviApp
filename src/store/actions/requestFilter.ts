import * as Types from '../types/requestFilter';

const updateRequestStatusFilter = (payload: string) => ({
  type: Types.UPDATE_STATUS_FILTER,
  payload,
});

const updateRequestCategoryFilter = (payload: string) => ({
  type: Types.UPDATE_CATEGORY_FILTER,
  payload,
});

const updateRequestNameFilter = (payload: string) => ({
  type: Types.UPDATE_NAME_FILTER,
  payload,
});

export {
  updateRequestStatusFilter,
  updateRequestCategoryFilter,
  updateRequestNameFilter,
};
