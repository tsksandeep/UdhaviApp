import React from 'react';
import { View, Text } from 'react-native';
import { css } from '@emotion/native';
import moment from 'moment';
import { VStack } from 'native-base';
import SwipeRow from '../../SwipeRow/SwipeRow';
import { NotificationData } from '../../../store/reducers/modal/app.modal';

const NotificationCard = ({
  notification,
  onAnimationComplete,
}: {
  notification: NotificationData;
  onAnimationComplete: any;
}) => {
  const formatTimeFromNow = (timestamp: number) => {
    return moment(timestamp * 1000).fromNow();
  };
  return (
    <SwipeRow onAnimationComplete={() => onAnimationComplete(notification)}>
      <View
        style={
          notification.category === 'request'
            ? {
                ...styles.requestContainerHeaderBorder,
                ...styles.containerHeaderView,
              }
            : {
                ...styles.volunteerContainerHeaderBorder,
                ...styles.containerHeaderView,
              }
        }
      >
        <Text style={styles.containerHeaderText}>{notification.category}</Text>
      </View>
      <View
        style={
          notification.category === 'request'
            ? { ...styles.requestNotiBorder, ...styles.container }
            : { ...styles.volunteerNotiBorder, ...styles.container }
        }
      >
        <VStack justifyContent={'space-between'} space={1}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.body}>{notification.body}</Text>
          <Text style={styles.timeStamp}>
            {formatTimeFromNow(notification.timestamp)}
          </Text>
        </VStack>
      </View>
    </SwipeRow>
  );
};

const styles = {
  containerHeaderView: css`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `,
  containerHeaderText: css`
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    padding: 2px 0;
  `,
  requestContainerHeaderBorder: css`
    background: #a914db;
  `,
  volunteerContainerHeaderBorder: css`
    background: #4287f5;
  `,
  container: css`
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    shadow-offset: 3px;
    shadow-color: #171717;
    shadow-opacity: 0.15;
    shadow-radius: 8px;
  `,
  title: css`
    font-size: 18px;
    font-weight: 500;
  `,
  body: css``,
  timeStamp: css`
    color: #979797;
    font-size: 12px;
  `,
  requestNotiBorder: css`
    border-color: #a914db;
  `,
  volunteerNotiBorder: css`
    border-color: #4287f5;
  `,
};

export default NotificationCard;
