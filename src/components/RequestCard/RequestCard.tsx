import React, { useState } from 'react';
import {
  Badge,
  Box,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack,
  Checkbox,
} from 'native-base';
import { TouchableRipple } from 'react-native-paper';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import RequestStatus from '../RequestStatus/RequestStatus';
import RequestETA from '../RequestETA/RequestETA';
import { RequestData } from '../../firebase/model';
import { RequestCategoryImageMap } from '../../constants/constants';
import {
  clearPendingSelection,
  getPendingSelection,
  isAssignedToValid,
  setPendingSelection,
} from '../../store/shared/shared';
import {
  callNumber,
  elapsedSecondsFromNow,
  secondsToHms,
} from '../../common/common';
import { PendingSelectionInitialState } from '../../store/reducers/pendingSelection';
import { RequestSelectionInitialState } from '../../store/reducers/requestSelection';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import { AppInitialState } from '../../store/reducers/app';
import { css } from '@emotion/native';

const RequestCard = (props: {
  mode: string;
  request: RequestData;
  app: AppInitialState;
  requestSelection: RequestSelectionInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
  pendingSelection: PendingSelectionInitialState;
  actions: any;
}) => {
  const {
    mode,
    actions,
    request,
    app,
    requestSelection,
    volunteerSelection,
    pendingSelection,
  } = props;

  var servedByCount = request.assignedTo
    ? Object.keys(request.assignedTo).length
    : 0;
  var isRequestSelected =
    requestSelection.requestSelected &&
    requestSelection.requestSelected === request.id
      ? true
      : false;
  var isVolunteerSelected = volunteerSelection.volunteerSelected ? true : false;

  var checkColorTheme = 'success';
  if (isVolunteerSelected) {
    if (mode == 'assigned') {
      checkColorTheme = 'danger';
    }
  }

  var checkBox = null;
  const [selectedState, setSelectedState] = useState(
    getPendingSelection(pendingSelection, 'request', mode, request.id),
  );
  // to check the logic
  if (isVolunteerSelected) {
    checkBox = (
      <Checkbox
        accessibilityLabel={request.id}
        value={selectedState.toString()}
        onChange={(isSelected: boolean) => {
          setPendingSelection(
            pendingSelection,
            'request',
            mode,
            request.id,
            isSelected,
          );
          setSelectedState(isSelected);
        }}
        colorScheme={checkColorTheme}
      />
    );
  }

  var callVolunteerElement = null;
  if (isAssignedToValid(request)) {
    callVolunteerElement = (
      <TouchableRipple onPress={() => callNumber('+14255168317')}>
        <Image
          size="30px"
          source={require('../../assets/images/CallVolunteer.png')}
          alignSelf="center"
          alt="telephone"
        />
      </TouchableRipple>
    );
  }

  const getRequestCategoryImage = () => {
    if (RequestCategoryImageMap[request.category]) {
      return RequestCategoryImageMap[request.category];
    }
    return RequestCategoryImageMap.misc;
  };

  return (
    <Pressable
      style={RequestCardStyle.container}
      key={request.id}
      onPress={() => {
        if (isRequestSelected) {
          clearPendingSelection(actions);
        } else {
          actions.updateRequestSelection(request.id);
        }
      }}
    >
      <Box
        style={RequestCardStyle.box}
        key={request.id}
        _dark={{
          borderColor: 'gray.600',
        }}
        bg={isRequestSelected ? 'yellow.100' : 'white'}
      >
        <HStack space={3} alignItems="center" justifyContent="space-between">
          {checkBox}
          <VStack justifyContent="space-between">
            <Image
              size={'35px'}
              source={getRequestCategoryImage()}
              alignSelf="center"
              alt="category.png"
            />
            <Badge style={RequestCardStyle.elapsedTime}>
              {secondsToHms(elapsedSecondsFromNow(request.date))}
            </Badge>
          </VStack>
          <VStack justifyContent="center">
            <Text style={RequestCardStyle.requestName}>{request.name}</Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {request.message ? request.message : 'Help needed'}
            </Text>
            <Text style={RequestCardStyle.requestId}>
              Request ID: {request.id}
            </Text>
          </VStack>
          <Spacer />
          {callVolunteerElement}
          {request.eta ? (
            <RequestETA
              actions={actions}
              request={request}
              requests={app.requestsMap}
            />
          ) : null}
          <VStack justifyContent="center" alignItems="flex-end">
            <RequestStatus
              actions={actions}
              request={request}
              requests={app.requestsMap}
              volunteers={app.volunteersMap}
            />
            {servedByCount > 0 && (
              <Text bold fontSize="xs" style={{ color: 'green' }}>
                {servedByCount} Volunteers
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

const RequestCardStyle = {
  container: css`
    margin-top: 5px;
  `,
  box: css`
    margin: 3px 0;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #d3d3d3;
  `,
  elapsedTime: css`
    width: 50px;
    margin-top: 5px;
  `,
  requestName: css`
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
  `,
  requestId: css`
    color: gray;
    font-size: 10px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (state: any) => state.requestSelection,
  (state: any) => state.volunteerSelection,
  (state: any) => state.pendingSelection,
  (
    app: AppInitialState,
    requestSelection: RequestSelectionInitialState,
    volunteerSelection: VolunteerSelectionInitialState,
    pendingSelection: PendingSelectionInitialState,
  ) => ({
    app,
    requestSelection,
    volunteerSelection,
    pendingSelection,
  }),
);

export default connect(selector, bindDispatch)(RequestCard);
