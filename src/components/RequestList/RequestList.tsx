import React from 'react';
import { Badge, VStack } from 'native-base';
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
  var filteredRequests: RequestData[] = Array.from(app.requestsMap.values());

  if (requestFilter.requestFilter && requestFilter.requestFilter !== 'all') {
    filteredRequests = filteredRequests.filter(
      (request) => request.status == requestFilter.requestFilter,
    );
  }

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

  let msg;
  if (!requestFilter.requestFilter || requestFilter.requestFilter == 'All') {
    msg = `No requests were found`;
  } else {
    msg = `No requests were found matching filter "${requestFilter.requestFilter}"`;
  }

  return (
    <VStack
      style={RequestListStyle.notFound}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Badge variant="subtle" colorScheme="danger" alignSelf="center">
        {msg}
      </Badge>
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
