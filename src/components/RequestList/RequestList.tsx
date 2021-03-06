import React from 'react';
import { Text, VStack, View } from 'native-base';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { css } from '@emotion/native';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';

import bindDispatch from '../../utils/actions';
import RequestCard from '../RequestCard/RequestCard';
import { RequestData } from '../../firebase/model';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import { sortByDate } from '../../common/common';
import { AppInitialState } from '../../store/reducers/app';

const RequestList = ({
  actions,
  app,
  requestFilter,
  flatlistRef,
  mode,
}: {
  actions: any;
  app: AppInitialState;
  requestFilter: RequestFilterInitialState;
  flatlistRef: React.Ref<BottomSheetFlatListMethods>;
  mode: string;
}) => {
  var filters = [];
  var filterMessage = 'No requests were found';
  var filteredRequests: RequestData[] = Array.from(app.requestsMap.values());

  if (
    requestFilter.status !== 'all' ||
    requestFilter.category !== 'all' ||
    requestFilter.name !== 'all'
  ) {
    filterMessage += ' for matching filter(s): ';
  }

  if (requestFilter.status !== 'all') {
    filters.push(requestFilter.status);
    filteredRequests = filteredRequests.filter(
      (request) => request.status === requestFilter.status,
    );
  }

  if (requestFilter.category !== 'all') {
    filters.push(requestFilter.category);
    filteredRequests = filteredRequests.filter(
      (request) => request.category === requestFilter.category,
    );
  }

  if (requestFilter.name !== 'all') {
    filters.push(requestFilter.name);
    filteredRequests = filteredRequests.filter(
      (request) => request.name === requestFilter.name,
    );
  }

  filterMessage += filters.join(', ');

  if (filteredRequests.length > 0) {
    return (
      <BottomSheetFlatList
        ref={flatlistRef}
        contentContainerStyle={RequestListStyle.container}
        data={sortByDate(filteredRequests)}
        renderItem={({ item }: { item: RequestData }) => (
          <RequestCard mode={mode} request={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }

  return (
    <VStack style={RequestListStyle.notFound} flex={1} alignItems="center">
      <View style={RequestListStyle.notFoundTextWrapper}>
        <Text style={RequestListStyle.notFoundText}>{filterMessage}</Text>
      </View>
    </VStack>
  );
};

const RequestListStyle = {
  container: css`
    padding: 10px 10px 40px 10px;
  `,
  notFound: css`
    margin-top: 20px;
  `,
  notFoundTextWrapper: css`
    background: #d91e18;
    border-radius: 10px;
  `,
  notFoundText: css`
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    padding: 5px 10px;
    text-align: center;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (state: any) => state.requestFilter,
  (app: AppInitialState, requestFilter: RequestFilterInitialState) => ({
    app,
    requestFilter,
  }),
);

export default connect(selector, bindDispatch)(RequestList);
