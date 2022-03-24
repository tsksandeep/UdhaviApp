import React from 'react';
import { FlatList } from 'react-native';
import { css } from '@emotion/native';
import NotificationCard from '../notificationCard/NotificationCard';
import { Notification } from '../notificationTypes';

const notificationMockData: Notification[] = [
  {
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },

  {
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },

  {
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
];

const NotificationList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={NotificationListStyle.list}
      data={notificationMockData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return <NotificationCard notification={item}></NotificationCard>;
      }}
    />
  );
};

const NotificationListStyle = {
  list: css`
    margin: 15px 0;
  `,
};

export default NotificationList;
