import React, { useState } from 'react';

import { Badge } from 'native-base';
import { releaseAllVolunteersFromRequest } from '../../store/shared/shared';
import { RequestData, VolunteerData } from '../../firebase/model';
import { RequestStates } from '../../constants/constants';
import { Text } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { css } from '@emotion/native';

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
      <Badge
        style={RequestStatusStyle.badge}
        colorScheme={colorScheme}
        variant={'subtle'}
      >
        Loading
      </Badge>
    );
  var words = request.status.split(' ');
  return (
    <Badge
      style={RequestStatusStyle.badge}
      colorScheme={colorScheme}
      variant={'subtle'}
    >
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
          <MenuItem
            style={RequestStatusStyle.menuItem}
            key={index}
            onPress={() => props.onSelectedCallback(menuItem)}
          >
            {menuItem}
          </MenuItem>
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
  const [visible, setVisible] = useState(false);

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
    requests.set('id', request);
    actions.updateRequestsMap(requests);
  };

  return (
    <Menu
      visible={visible}
      anchor={
        <Text onPress={() => setVisible(true)}>
          {getRequestStatusBadge(request)}
        </Text>
      }
      onRequestClose={() => setVisible(false)}
    >
      <MenuItemWithAction
        menuItems={RequestStates}
        onSelectedCallback={onSelectedCallback}
      />
    </Menu>
  );
};

const RequestStatusStyle = {
  badge: css`
    border-radius: 8px;
  `,
  menuItem: css`
    height: 30px;
  `,
};

export default RequestStatus;
