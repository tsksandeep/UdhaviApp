import { css } from '@emotion/native';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Dimensions, View } from 'react-native';
import NotificationList from '../components/notifications/notificationList/NotificationList';
import MenuBar from '../components/MenuBar/MenuBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Notification = () => {
  const responseListener = useRef<any>();
  const notificationListener = useRef<any>();

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View style={styles.container}>
      <MenuBar showBackButton={true} />
      <NotificationList />
    </View>
  );
};

const styles = {
  container: css`
    background: white;
    min-width: ${screenWidth}px;
    min-height: ${screenHeight}px;
    width: 100%;
    flex: 1;
    padding: 24px;
    background: #fdf6e4;
  `,
};

export default Notification;
