import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { css } from '@emotion/native';
import NotificationCard from '../notificationCard/NotificationCard';
import BackButton from '../../BackButton/BackButton';
import { Notification } from '../notificationTypes';

const notificationMockData: Notification[] = [
  {
    body: 'Body',
    title: 'Title',
    category: 'request',
    timeStamp: 1648038614236,
  },

  {
    body: 'Body',
    title: 'Title',
    category: 'volunteer',
    timeStamp: 1648041998439,
  },
];

const NotificationList = () => {
  return (
    <FlatList
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
