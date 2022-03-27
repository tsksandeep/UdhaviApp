import { css } from '@emotion/native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import NotificationList from '../components/notifications/notificationList/NotificationList';
import MenuBar from '../components/MenuBar/MenuBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Notification = () => {
  return (
    <View style={styles.container}>
      <MenuBar showBackButton={true} showContainerShadow />
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
    background: #fdf6e4;
  `,
};

export default Notification;
