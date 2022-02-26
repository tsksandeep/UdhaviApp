import React from 'react';
import { View } from 'react-native';

import MapScreen from '../MapScreen/MapScreen';
import Entity from '../../screens/Entity';

const DashboardComponent = (props: any) => {
  const { user, setUser } = props;

  if (!user || !setUser) {
    return <> </>;
  }

  return (
    <View>
      <MapScreen />
      <Entity />
    </View>
  );
};

export default DashboardComponent;
