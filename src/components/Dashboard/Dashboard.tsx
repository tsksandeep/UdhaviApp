import React from 'react';
import { View } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import { SettingsInitialState } from '../../store/reducers/settings';
import MapScreen from '../MapScreen/MapScreen';
import Entity from '../../screens/Entity';
import Settings from '../Settings/Settings';

const DashboardComponent = ({
  actions,
  settings,
}: {
  actions: any;
  settings: SettingsInitialState;
}) => {
  if (settings.settingsInfo.view === 'details') {
    return (
      <View>
        <Settings />
        <Entity />
      </View>
    );
  }

  if (settings.settingsInfo.view === 'map') {
    return (
      <View>
        <Settings />
        <MapScreen fullscreen={true} />
      </View>
    );
  }

  return (
    <View>
      <Settings />
      <MapScreen fullscreen={false} />
      <Entity />
    </View>
  );
};

const selector = createSelector(
  (state: any) => state.settings,
  (settings: SettingsInitialState) => ({ settings }),
);

export default connect(selector, bindDispatch)(DashboardComponent);
