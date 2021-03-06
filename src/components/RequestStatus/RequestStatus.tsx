import React from 'react';
import { Menu, Pressable, Badge } from 'native-base';

import { releaseAllVolunteersFromRequest } from '../../store/shared/shared';
import { RequestData, VolunteerData } from '../../firebase/model';
import { RequestStates } from '../../constants/constants';

const getRequestStatusColor = (status: string) => {
  var colorScheme = 'warning';
  if (status == 'New') {
    colorScheme = 'danger';
  } else if (status == 'Completed') {
    colorScheme = 'success';
  } else if (status == 'Processing') {
    colorScheme = 'warning';
  } else if (status == 'Cancelled') {
    colorScheme = 'danger';
  }

  return colorScheme;
};

const getRequestStatusBadge = (request: RequestData) => {
  var colorScheme = getRequestStatusColor(request.status);
  if (!request.status)
    return (
      <Badge colorScheme={colorScheme} variant={'subtle'}>
        Loading
      </Badge>
    );
  var words = request.status.split(' ');
  return (
    <Badge colorScheme={colorScheme} variant={'subtle'}>
      {words[0]}
      {words[1]}
    </Badge>
  );
};

const MenuItemWithAction = (props: {
  menuItems: string[];
  onSelectedCallback: Function;
}) => {
  return (
    <>
      {props.menuItems.map((menuItem, index) => {
        return (
          <Menu.Item
            key={index}
            onPress={() => props.onSelectedCallback(menuItem)}
          >
            {menuItem}
          </Menu.Item>
        );
      })}
    </>
  );
};

const RequestStatus = (props: {
  actions: any;
  request: RequestData;
  requests: Map<string, RequestData>;
  volunteers: Map<string, VolunteerData>;
}) => {
  const { actions, request, requests, volunteers } = props;

  const onSelectedCallback = async (newState: string) => {
    if (newState == 'Completed') {
      await releaseAllVolunteersFromRequest(
        actions,
        requests,
        volunteers,
        request.id,
      );
    }
    request.status = newState;
    requests[request.id] = request;
    actions.updateRequestsMap(requests);
  };

  return (
    <Menu
      w="190"
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            {getRequestStatusBadge(request)}
          </Pressable>
        );
      }}
    >
      <MenuItemWithAction
        menuItems={RequestStates}
        onSelectedCallback={onSelectedCallback}
      />
    </Menu>
  );
};

export default RequestStatus;
