import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, UIManager } from 'react-native';
import { css } from '@emotion/native';
import NotificationCard from '../notificationCard/NotificationCard';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import bindDispatch from '../../../utils/actions';
import { AppInitialState } from '../../../store/reducers/app';
import { NotificationData } from '../../../store/reducers/modal/app.modal';

const NotificationList = ({
  actions,
  app,
}: {
  actions: any;
  app: AppInitialState;
}) => {
  useEffect(() => {
    setNotificationList(app.notifications);
  }, [app.notifications]);

  const [notificationList, setNotificationList] = useState(app.notifications);

  const onAnimationComplete = (notification: NotificationData) => {
    let notifications = notificationList.filter(
      (item) => item.id !== notification.id,
    );

    actions.updateNotifications(notifications);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        'opacity',
      ),
    );

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
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(NotificationList);
