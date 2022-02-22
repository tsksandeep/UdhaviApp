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
  IconButton,
  Checkbox,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';

import RequestStatus from '../RequestStatus/RequestStatus';
import RequestETA from '../RequestETA/RequestETA';
import { RequestData } from '../../firebase/model';
import { RequestsMap } from '../../store/reducers/updateRequests';
import { VolunteersMap } from '../../store/reducers/updateVolunteers';
import { RequestCategoryImageMap } from '../../constants/constants';
import {
  clearPendingSelection,
  getPendingSelection,
  isAssignedToValid,
  setPendingSelection,
} from '../../store/shared/shared';
import { callNumber } from '../../common/common';
import { PendingSelection } from '../../store/reducers/pendingSelection';

const RequestCard = (props: {
  mode: string;
  actions: any;
  request: RequestData;
  requests: RequestsMap;
  volunteers: VolunteersMap;
  selectedRequest: string;
  selectedVolunteer: string;
  pendingSelection: PendingSelection;
}) => {
  const {
    mode,
    actions,
    request,
    requests,
    volunteers,
    selectedRequest,
    selectedVolunteer,
    pendingSelection,
  } = props;
  const itemDisplayId = `R${request.id}`;

  var servedByCount = request.assignedTo
    ? Object.keys(request.assignedTo).length
    : 0;
  var isRequestSelected = selectedRequest ? true : false;
  var isVolunteerSelected = selectedVolunteer ? true : false;

  var backButton = null;
  if (isRequestSelected) {
    backButton = (
      <IconButton
        onPress={() => clearPendingSelection(actions)}
        colorScheme="danger"
        key={request.id}
        size={'sm'}
        _icon={{
          as: Entypo,
          name: 'back',
        }}
      />
    );
  }

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

  return (
    <Pressable
      key={request.id}
      onPress={() => actions.updateRequestSelection(request.id)}
    >
      <Box
        key={request.id}
        shadow={isRequestSelected ? '3' : '0'}
        borderBottomWidth={isRequestSelected ? '3' : '1'}
        _dark={{
          borderColor: 'gray.600',
        }}
        borderColor={isRequestSelected ? 'red.800' : 'coolGray.200'}
        borderWidth={isRequestSelected ? '3' : '0'}
        bg={isRequestSelected ? 'yellow.100' : 'white'}
        pl="2"
        pr="2"
        py="1"
      >
        <HStack space={3} alignItems="center" justifyContent="space-between">
          {backButton}
          {checkBox}
          <VStack justifyContent="space-between">
            <Image
              size="20px"
              source={RequestCategoryImageMap[request.category]}
              alignSelf="center"
              alt={request.category}
            />
            <Badge colorScheme="info" variant={'outline'} alignSelf="center">
              {itemDisplayId}
            </Badge>
          </VStack>
          <VStack justifyContent="center">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold
            >
              {request.name}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {request.message ? request.message : 'Help needed'}
            </Text>
          </VStack>
          <Spacer />
          {callVolunteerElement}
          {request.eta ? (
            <RequestETA
              actions={actions}
              request={request}
              requests={requests}
            />
          ) : null}
          <VStack justifyContent="center" alignItems="flex-end">
            <RequestStatus
              actions={actions}
              request={request}
              requests={requests}
              volunteers={volunteers}
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

export default RequestCard;
