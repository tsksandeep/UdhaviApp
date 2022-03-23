import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as ThemeWrapper } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import { SSRProvider } from '@react-aria/ssr';
import * as Notifications from 'expo-notifications';

import Home from './src/screens/Home';
import Otp from './src/screens/Otp';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Request from './src/screens/Request';
import Chat from './src/screens/Chat';

import configureStore from './src/store';
import { theme } from './src/core/theme';
import MapScreen from './src/components/MapScreen/MapScreen';
import GetLocation from './src/screens/GetLocation';
import RequestCategory from './src/screens/RequestCategory';
import Notification from './src/screens/Notification';
import { UserData } from './src/firebase/model';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

declare global {
  type RootStackParamList = {
    // undefined is used as we are not passing parameters
    Home: {
      // message should be always in the format
      // <Random message number>: <Your message>
      // Random message number is used to render the state properly
      message?: string;
    };
    Otp: {
      page: string;
      verificationId: string;
      name?: string;
      phoneNumber?: string;
    };
    Login: {
      error?: Error;
    };
    Register: {
      error?: Error;
    };
    Request: {
      name: string;
    };
    Map: {
      showConfirmButton?: boolean;
    };
    GetLocation: {};
    RequestCategory: undefined;
    Notification: undefined;
    Chat: {
      groupId: string;
      userData: UserData;
    };
  };
}

const Stack = createStackNavigator<RootStackParamList>();
const linking = {
  prefixes: ['https://udhaviapp.com', 'udhaviapp://'],
  config: {
    screens: {
      Home: '/home',
      Otp: '/otp',
      Login: '/login',
      Register: '/register',
      Request: '/request',
      Map: '/map',
      GetLocation: '/getLocation',
      RequestCategory: '/requestCategory',
      notification: '/notification',
      Chat: '/chat',
    },
  },
};

const App = () => {
  return (
    <Provider store={configureStore()}>
      <SSRProvider>
        <NativeBaseProvider>
          <ThemeWrapper theme={theme}>
            <NavigationContainer linking={linking}>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Request" component={Request} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="GetLocation" component={GetLocation} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen
                  name="RequestCategory"
                  component={RequestCategory}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeWrapper>
        </NativeBaseProvider>
      </SSRProvider>
    </Provider>
  );
};

export default App;
