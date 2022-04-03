import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { FlatList, View, Text } from 'react-native';
import { css } from '@emotion/native';

import bindDispatch from '../../utils/actions';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import ItemFilter from '../ItemFilter/ItemFilter';
import { RequestStates, RequestCategoryList } from '../../constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RequestFilter = ({
  actions,
  requestFilter,
}: {
  actions: any;
  requestFilter: RequestFilterInitialState;
}) => {
  const data = [
    {
      name: 'status',
      filter: requestFilter.status,
      setFilterCallback: actions.updateRequestStatusFilter,
      states: RequestStates,
    },
    {
      name: 'category',
      filter: requestFilter.category,
      setFilterCallback: actions.updateRequestCategoryFilter,
      states: RequestCategoryList,
    },
    {
      name: 'name',
      filter: requestFilter.name,
      setFilterCallback: actions.updateRequestNameFilter,
      states: [],
    },
  ];

  return (
    <View style={RequestFilterStyle.container}>
      <Feather
        name="filter"
        size={32}
        color="#560cce"
        style={RequestFilterStyle.icon}
      />
      <FlatList
        style={RequestFilterStyle.filterlist}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <ItemFilter
              name={item.name}
              filter={item.filter}
              setFilterCallback={item.setFilterCallback}
              states={item.states}
            />
          );
        }}
      />
      <TouchableOpacity
        style={RequestFilterStyle.clearTextWrapper}
        onPress={() => {
          actions.updateRequestStatusFilter('all');
          actions.updateRequestCategoryFilter('all');
          actions.updateRequestNameFilter('all');
        }}
      >
        <Text style={RequestFilterStyle.clearText}>Clear</Text>
      </TouchableOpacity>
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
    position: absolute;
    top: -4px;
    margin-right: 5px;
  `,
  clearTextWrapper: css`
    padding: 3px 10px;
    border-radius: 10px;
    background: #fff;
    border: 2px solid #560cce;
    margin: 0 5px;
  `,
  clearText: css`
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #560cce;
  `,
  filterlist: css`
    margin-left: 40px;
  `,
};

const selector = createSelector(
  (state: any) => state.requestFilter,
  (requestFilter: RequestFilterInitialState) => ({ requestFilter }),
);

export default connect(selector, bindDispatch)(RequestFilter);
