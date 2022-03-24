import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, UIManager } from 'react-native';
import { css } from '@emotion/native';
import NotificationCard from '../notificationCard/NotificationCard';
import { Notification } from '../notificationTypes';

const notificationMockData: Notification[] = [
  {
    id: '1',
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    id: '2',
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    id: '3',
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    id: '4',
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    id: '5',
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    id: '6',
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
  {
    id: '7',
    title: 'New Volunteer Assigned',
    body: 'A new volunteer (sandeep kumar) has been assigned to your request R100',
    category: 'request',
    timeStamp: 1648038614236,
  },
  {
    id: '8',
    title: 'New Message from Vibeesh',
    body: 'Please bring the food packets fast. Delivery is near lb road, adayar...',
    category: 'chat',
    timeStamp: 1648041998439,
  },
];

const NotificationList = () => {
  const [notificationList, setNotificationList] =
    useState(notificationMockData);

  const onAnimationComplete = (notification: Notification) => {
    setNotificationList(
      notificationList.filter((item) => item.id !== notification.id),
    );

    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        'opacity',
      ),
    );
  };

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={NotificationListStyle.list}
      data={notificationList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <NotificationCard
            onAnimationComplete={onAnimationComplete}
            notification={item}
          ></NotificationCard>
        );
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
