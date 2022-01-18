import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import ItemFilter from '../ItemFilter/ItemFilter';
import {
  RequestStates,
  RequestsAssignedFilterOption,
} from '../../constants/constants';

const RequestFilter = ({
  actions,
  requestFilter,
}: {
  actions: any;
  requestFilter: RequestFilterInitialState;
}) => {
  return (
    <ItemFilter
      filter={requestFilter.requestFilter}
      setFilterCallback={actions.updateRequestFilterInfo}
      states={RequestStates}
      filterOption={RequestsAssignedFilterOption}
    />
  );
};

const selector = createSelector(
  (state: any) => state.requestFilter,
  (requestFilter: RequestFilterInitialState) => ({ requestFilter }),
);

export default connect(selector, bindDispatch)(RequestFilter);
