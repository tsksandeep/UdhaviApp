import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as ThemeWrapper } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import Home from './src/screens/Home';
import Otp from './src/screens/Otp';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Request from './src/screens/Request';

import configureStore from './src/store';
import { theme } from './src/core/theme';
import MapScreen from './src/components/MapScreen/MapScreen';
import GetLocation from './src/screens/GetLocation';
import Entity from './src/screens/Entity';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
    Request: undefined;
    Map: {
      message?: string;
    };
    GetLocation: {};
    Entity: undefined;
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
      Map: '/Map',
      getLocation: '/getLocation',
    },
  },
};

const App = () => {
  return (
    <Provider store={configureStore()}>
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
              <Stack.Screen name="Entity" component={Entity} />
              <Stack.Screen name="GetLocation" component={GetLocation} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeWrapper>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
