import React from 'react';
import { Badge, View, VStack } from 'native-base';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import bindDispatch from '../../utils/actions';
import { getVolunteerByID } from '../../firebase/volunteers';
import { isAssignedToValid } from '../../store/shared/shared';
import RequestCard from '../RequestCard/RequestCard';
import { RequestData, VolunteerData } from '../../firebase/model';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import { sortByDate } from '../../common/common';
import { RequestsMap } from '../../store/reducers/app';
import { css } from '@emotion/native';

const RequestList = ({
  actions,
  requestsMap,
  requestFilter,
  volunteerSelected,
  mode,
}: {
  actions: any;
  requestsMap: RequestsMap;
  requestFilter: RequestFilterInitialState;
  volunteerSelected: VolunteerSelectionInitialState;
  mode: string;
}) => {
  let requests: any[] = [];

  if (!mode || mode == 'all') {
    requests = Object.values(requestsMap);
  } else if (mode == 'assigned') {
    getVolunteerByID(volunteerSelected.volunteerSelected).then(
      (volunteer: VolunteerData) => {
        if (volunteer.assignedTo) {
          let reqIds = Object.keys(volunteer.assignedTo);
          requests = reqIds.map((rid) => requestsMap[rid]);
        }
      },
    );
  } else if (mode == 'available') {
    getVolunteerByID(volunteerSelected.volunteerSelected).then(
      (volunteer: VolunteerData) => {
        if (isAssignedToValid(volunteer)) {
          let reqIds = Object.keys(volunteer.assignedTo);
          requests = Object.values(requestsMap).filter(
            (r) => !reqIds.includes(r.id),
          );
        } else {
          requests = Object.values(requestsMap);
        }
      },
    );
  }

  var filteredRequests = requests;
  if (requestFilter.requestFilter && requestFilter.requestFilter !== 'all') {
    var newFilteredRequests: RequestData[] = [];
    filteredRequests.forEach((request: RequestData) => {
      if (request.status == requestFilter.requestFilter) {
        newFilteredRequests.push(request);
      }
    });
    filteredRequests = newFilteredRequests;
  }

  if (filteredRequests.length > 0) {
    return (
      <View style={RequestListStyle.container}>
        <FlatList
          data={sortByDate(filteredRequests)}
          renderItem={({ item }: { item: RequestData }) => (
            <RequestCard mode={mode} request={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  } else {
    var msg = '';
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
  }
};

const RequestListStyle = {
  container: css`
    padding: 10px 20px;
  `,
  notFound: css`
    margin-top: 20px;
  `,
};

const selector = createSelector(
  (state: any) => state.requestFilter,
  (requestFilter: RequestFilterInitialState) => ({
    requestFilter,
  }),
);

export default connect(selector, bindDispatch)(RequestList);
