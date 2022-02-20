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
import { RequestsInitialState } from '../../store/reducers/updateRequests';
import { PendingSelectionInitialState } from '../../store/reducers/pendingSelection';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import { RequestFilterInitialState } from '../../store/reducers/requestFilter';
import { getItemSubCategory } from '../../common/common';
import { RequestSelectionInitialState } from '../../store/reducers/requestSelection';
import { VolunteersInitialState } from '../../store/reducers/updateVolunteers';

const RequestList = ({
  actions,
  allRequests,
  allVolunteers,
  requestFilter,
  requestSelected,
  volunteerSelected,
  pendingSelection,
  mode,
}: {
  actions: any;
  allRequests: RequestsInitialState;
  allVolunteers: VolunteersInitialState;
  requestFilter: RequestFilterInitialState;
  requestSelected: RequestSelectionInitialState;
  volunteerSelected: VolunteerSelectionInitialState;
  pendingSelection: PendingSelectionInitialState;
  mode: string;
}) => {
  let requests: any[] = [];
  if (!mode || mode == 'all') {
    requests = Object.values(allRequests);
  } else if (mode == 'assigned') {
    getVolunteerByID(volunteerSelected.volunteerSelected).then(
      (volunteer: VolunteerData) => {
        if (volunteer.assignedTo) {
          let reqIds = Object.keys(volunteer.assignedTo);
          requests = reqIds.map((rid) => allRequests.requests[rid]);
        }
      },
    );
  } else if (mode == 'available') {
    getVolunteerByID(volunteerSelected.volunteerSelected).then(
      (volunteer: VolunteerData) => {
        if (isAssignedToValid(volunteer)) {
          let reqIds = Object.keys(volunteer.assignedTo);
          requests = Object.values(allRequests).filter(
            (r) => !reqIds.includes(r.ID),
          );
        } else {
          requests = Object.values(allRequests);
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
        data={filteredRequests}
        renderItem={({ item }: { item: RequestData }) => (
          <RequestCard
            mode={mode}
            actions={actions}
            request={item}
            requests={allRequests.requests}
            volunteers={allVolunteers.volunteers}
            selectedRequest={requestSelected.requestSelected}
            selectedVolunteer={volunteerSelected.volunteerSelected}
            pendingSelection={pendingSelection.pendingSelection}
          />
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
