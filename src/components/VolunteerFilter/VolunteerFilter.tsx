import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import { VolunteerFilterInitialState } from '../../store/reducers/volunteerFilter';
import ItemFilter from '../ItemFilter/ItemFilter';
import { VolunteerStates } from '../../constants/constants';

const VolunteerFilter = ({
  actions,
  volunteerFilter,
}: {
  actions: any;
  volunteerFilter: VolunteerFilterInitialState;
}) => {
  return (
    <ItemFilter
      name="status"
      filter={volunteerFilter.volunteerFilter}
      setFilterCallback={actions.updateVolunteerFilterInfo}
      states={VolunteerStates}
    />
  );
};

const selector = createSelector(
  (state: any) => state.volunteerFilter,
  (volunteerFilter: VolunteerFilterInitialState) => ({ volunteerFilter }),
);

export default connect(selector, bindDispatch)(VolunteerFilter);
