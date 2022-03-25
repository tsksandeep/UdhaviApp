import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/native';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

import Logo from '../components/Logo/Logo';
import { FirebaseAuth } from '../firebase/config';
import AuthComponent from '../components/Auth/Auth';
import { readUserData } from '../firebase/user';
import { UserData } from '../firebase/model';
import DashboardComponent from '../components/Dashboard/Dashboard';
import { UserNotExistsError } from '../errors/errors';
import bindDispatch from '../utils/actions';
import { AppInitialState } from '../store/reducers/app';
import { registerForPushNotificationsAsync } from '../expo/pushNotification';
import { NotificationData } from '../store/reducers/modal/app.modal';

const Home = ({ actions, app }: { actions: any; app: AppInitialState }) => {
  let [fontsLoaded] = useFonts({
    Pacifico: require('../assets/fonts/Pacifico.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    name: '',
    phoneNumber: '',
    userId: '',
    expoToken: '',
  });

  useEffect(() => {
    actions.changeAppLoading(false);
  }, []);

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const resp = await readUserData(user.uid);
          actions.updateUserData(resp);
          if (resp instanceof UserNotExistsError) {
            setLoading(false);
            return;
          }

          const expoToken = await registerForPushNotificationsAsync(user.uid);
          if (expoToken !== '') {
            resp.expoToken = expoToken;
          }

          await actions.setInitialRequests(resp.phoneNumber);

          setUser(resp);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const responseListener = useRef<any>();
  const notificationListener = useRef<any>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const title = notification.request.content.title;
        const body = notification.request.content.body;
        const category = notification.request.content.data?.category;
        if (!title || !body || !category || typeof category !== 'string') {
          return;
        }

        let notificationData: NotificationData = {
          id: notification.request.identifier,
          body: body,
          title: title,
          category: category,
          timeStamp: notification.date,
        };

        let notifications = app.notifications;
        notifications.unshift(notificationData);
        actions.updateNotifications(notifications);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [app.notifications]);

  if (loading || !fontsLoaded) {
    return (
      <View style={HomeStyle.logoContainer}>
        <Logo />
      </View>
    );
  }

  return (
    <View style={HomeStyle.dashboardContainer}>
      {!user.userId ? <AuthComponent /> : <DashboardComponent />}
    </View>
  );
};

const HomeStyle = {
  logoContainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    padding: 150px 30px 0 30px;
  `,
  dashboardContainer: css`
    flex: 1;
    background: #fdf6e4;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(Home);
