import React from 'react';
import { View, Text } from 'react-native';
import { css } from '@emotion/native';
import moment from 'moment';
import { Notification } from '../notificationTypes';

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const formatTimeFromNow = (timeStamp: number) => {
    return moment(
      timeStamp.toString().length === 10 ? timeStamp * 1000 : timeStamp,
    ).fromNow();
  };
  return (
    <View
      style={
        notification.category === 'request'
          ? { ...styles.requestNotiBorder, ...styles.container }
          : { ...styles.volunteerNotiBorder, ...styles.container }
      }
    >
      <View>
        <Text style={styles.title}>{notification.title}</Text>
        <Text>{notification.body}</Text>
      </View>
      <View>
        <Text style={styles.timeStamp}>
          {formatTimeFromNow(notification.timeStamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: css`
    border-bottom-color: rgba(165, 165, 165, 0.1);
    border-bottom-width: 1px;
    height: 100px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  title: css`
    font-size: 20px;
    color: #02b5f3;
    text-transform: capitalize;
  `,
  timeStamp: css`
    color: #979797;
  `,
  requestNotiBorder: css`
    border-left-color: #a914db;
    border-left-width: 10px;
    border-radius: 10px;
  `,
  volunteerNotiBorder: css`
    border-left-color: #4287f5;
    border-left-width: 10px;
    border-radius: 10px;
  `,
};

export default NotificationCard;
