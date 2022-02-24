import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FirebaseAuth } from '../../firebase/config';
import Button from '../Button/Button';
import DashboardComponentStyle from './Dashboard.style';
import MapScreen from '../MapScreen/MapScreen';

const getCleanedMessageText = (msg: string): string => {
  return msg.split(': ')[1];
};

const DashboardComponent = (props: any) => {
  const { user, setUser, message } = props;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [messageText, setMessageText] = useState(message);
  useEffect(() => {
    if (message) {
      setMessageText(message);
      setTimeout(() => {
        setMessageText(null);
      }, 5000);
    }
  }, [message]);

  if (!user || !setUser) {
    return <> </>;
  }

  return (
    <View style={DashboardComponentStyle.container}>
      <MapScreen></MapScreen>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate('Request');
        }}
      >
        Submit a request
      </Button>
    </View>
  );
};

export default DashboardComponent;
