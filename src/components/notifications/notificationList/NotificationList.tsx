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
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Notification</Text>
      </View>
      <FlatList
        data={notificationMockData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return <NotificationCard notification={item}></NotificationCard>;
        }}
      />
    </View>
  );
};

const styles = {
  container: css`
    background: white;
  `,
  headerText: css`
    font-family: 'Pacifico';
    font-size: 30px;
    color: #560cce;
    text-transform: capitalize;
    flex: 1;
    text-align: center;
  `,
  header: css`
    align-items: center;
    flex-direction: row;
    border-bottom-color: #91a0a6;
    border-bottom-width: 1px;
    padding-bottom: 12px;
    justify-content: center;
    margin-bottom: 4px;
  `,
};

export default NotificationList;
