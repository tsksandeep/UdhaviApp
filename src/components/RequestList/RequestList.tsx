import React from 'react';
import { Badge, VStack } from 'native-base';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import bindDispatch from '../../utils/actions';
import { getVolunteerByID } from '../../firebase/volunteers';
import {
  isAssignedToValid,
  isRequestMatchingFilter,
} from '../../store/shared/shared';
import RequestCard from '../RequestCard/RequestCard';
import { RequestData, VolunteerData } from '../../firebase/model';
import { PendingSelectionInitialState } from '../../store/reducers/pendingSelection';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import { getItemSubCategory, sortByDate } from '../../common/common';
import { RequestSelectionInitialState } from '../../store/reducers/requestSelection';
import { RequestsMap } from '../../store/reducers/app';

const RequestList = ({
  actions,
  requestsMap,
  requestFilter,
  requestSelected,
  volunteerSelected,
  pendingSelection,
  mode,
}: {
  actions: any;
  requestsMap: RequestsMap;
  requestFilter: RequestFilterInitialState;
  requestSelected: RequestSelectionInitialState;
  volunteerSelected: VolunteerSelectionInitialState;
  pendingSelection: PendingSelectionInitialState;
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

  let filteredRequests = requests;
  if (requestFilter.requestFilter) {
    filteredRequests = requests.filter((request: RequestData) => {
      let sub = getItemSubCategory(
        pendingSelection.pendingSelection,
        requestSelected.requestSelected,
        volunteerSelected.volunteerSelected,
        'request',
        request,
      );
      return (
        sub != 'default' ||
        isRequestMatchingFilter(request, requestFilter.requestFilter)
      );
    });
  }

  if (filteredRequests.length > 0) {
    return (
      <FlatList
        data={sortByDate(filteredRequests)}
        renderItem={({ item }: { item: RequestData }) => (
          <RequestCard mode={mode} request={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  } else {
    var msg = '';
    if (!requestFilter.requestFilter || requestFilter.requestFilter == 'All') {
      msg = `No requests were found`;
    } else {
      msg = `No requests were found matching filter "${requestFilter.requestFilter}"`;
    }
    return (
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Badge variant="subtle" colorScheme="danger" alignSelf="center">
          {msg}
        </Badge>
      </VStack>
    );
  }
};

const selector = createSelector(
  (state: any) => state.requestFilter,
  (state: any) => state.requestSelected,
  (state: any) => state.pendingSelection,
  (
    requestFilter: RequestFilterInitialState,
    requestSelected: RequestSelectionInitialState,
    pendingSelection: PendingSelectionInitialState,
  ) => ({
    requestFilter,
    requestSelected,
    pendingSelection,
  }),
);

export default connect(selector, bindDispatch)(RequestList);
