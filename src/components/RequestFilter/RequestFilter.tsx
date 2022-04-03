import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import { css } from '@emotion/native';

import bindDispatch from '../../utils/actions';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import ItemFilter from '../ItemFilter/ItemFilter';
import { RequestStates, RequestCategoryList } from '../../constants/constants';

const RequestFilter = ({
  actions,
  requestFilter,
}: {
  actions: any;
  requestFilter: RequestFilterInitialState;
}) => {
  return (
    <View style={RequestFilterStyle.container}>
      <Feather
        name="filter"
        size={34}
        color="#560cce"
        style={RequestFilterStyle.icon}
      />
      <ItemFilter
        name="status"
        filter={requestFilter.status}
        setFilterCallback={actions.updateRequestStatusFilter}
        states={RequestStates}
      />
      <ItemFilter
        name="category"
        filter={requestFilter.category}
        setFilterCallback={actions.updateRequestCategoryFilter}
        states={RequestCategoryList}
      />
      <ItemFilter
        name="name"
        filter={requestFilter.name}
        setFilterCallback={actions.updateRequestNameFilter}
        states={[]}
      />
    </View>
  );
};

const RequestFilterStyle = {
  container: css`
    margin: 10px;
    display: flex;
    flex-direction: row;
  `,
  icon: css`
    position: relative;
    top: -4px;
  `,
};

const selector = createSelector(
  (state: any) => state.requestFilter,
  (requestFilter: RequestFilterInitialState) => ({ requestFilter }),
);

export default connect(selector, bindDispatch)(RequestFilter);
