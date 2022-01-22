import React, { useEffect, useState } from 'react';
import { css } from '@emotion/native';
import { View } from 'react-native';
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

const Home = (props: any) => {
  let [fontsLoaded] = useFonts({
    Pacifico: require('../assets/fonts/Pacifico.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    name: '',
    phoneNumber: '',
    userId: '',
  });

  useEffect(() => {
    props.actions.changeAppLoading(false);
  }, []);

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const resp = await readUserData(user.uid);
        if (resp instanceof UserNotExistsError) setLoading(false);
        setLoading(false);
        setUser(resp);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading || !fontsLoaded) {
    return (
      <View style={HomeStyle.container}>
        <Logo />
      </View>
    );
  }

  return (
    <>
      {!user.userId ? (
        <AuthComponent />
      ) : (
        <DashboardComponent
          user={user}
          setUser={setUser}
          message={props?.route?.params?.message}
        />
      )}
    </>
  );
};

const HomeStyle = {
  container: css`
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

export default connect(selector, bindDispatch)(Home);
