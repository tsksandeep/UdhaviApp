import React, { useEffect, useState } from 'react';
import { css } from '@emotion/native';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Logo from '../components/Logo/Logo';
import { FirebaseAuth } from '../firebase/config';
import AuthComponent from '../components/Auth/Auth';
import { readUserData } from '../firebase/user';
import { UserData } from '../firebase/model';
import DashboardComponent from '../components/Dashboard/Dashboard';
import { UserNotExistsError } from '../errors/errors';
import bindDispatch from '../utils/actions';
import { AppInitialState } from '../store/reducers/app';
import { getExistingRequests } from '../store/shared/shared';

const Home = ({ actions, app }: { actions: any; app: AppInitialState }) => {
  let [fontsLoaded] = useFonts({
    Pacifico: require('../assets/fonts/Pacifico.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    name: '',
    phoneNumber: '',
    userId: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    actions.changeAppLoading(false);
  }, []);

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const resp = await readUserData(user.uid);
        if (resp instanceof UserNotExistsError) {
          setLoading(false);
          return;
        }
        actions.updateUserData(resp);
        await actions.setInitialRequests(resp.phoneNumber);
        setUser(resp);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const requests = await getExistingRequests(user.phoneNumber!);
    actions.updateRequestsMap(requests);
    setRefreshing(false);
  };

  if (loading || !fontsLoaded) {
    return (
      <View style={HomeStyle.logoContainer}>
        <Logo />
      </View>
    );
  }

  return (
    <View style={HomeStyle.dashboardContainer}>
      {!user.userId ? (
        <AuthComponent />
      ) : (
        <ScrollView
          contentContainerStyle={HomeStyle.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pulling latest updates..."
            />
          }
        >
          <DashboardComponent />
        </ScrollView>
      )}
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
  scrollView: css`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(Home);
