import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, UIManager } from 'react-native';
import { css } from '@emotion/native';
import NotificationCard from '../notificationCard/NotificationCard';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import bindDispatch from '../../../utils/actions';
import { AppInitialState } from '../../../store/reducers/app';
import { NotificationData } from '../../../store/reducers/modal/app.modal';
import {
  deleteNotification,
  unsubscribeNotificationCallback,
} from '../../../firebase/notifications';

const NotificationList = ({
  actions,
  app,
}: {
  actions: any;
  app: AppInitialState;
}) => {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    unsubscribeNotificationCallback(app.user.userId, setNotificationList);
  }, []);

  const onAnimationComplete = (notification: NotificationData) => {
    if (notificationList) {
      let notifications = notificationList.filter(
        (item: NotificationData) => item.id !== notification.id,
      );

      setNotificationList(notifications);

      deleteNotification(app.user.userId, notification.id);

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeInEaseOut,
          'opacity',
        ),
      );
    }
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
          />
        );
      }}
    />
  );
};

const NotificationListStyle = {
  list: css`
    margin: 15px 0;
    overflow: visible;
  `,
  logoContainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    padding: 150px 30px 0 30px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(NotificationList);
