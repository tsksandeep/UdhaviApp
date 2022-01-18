import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Divider, Icon, Menu } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import { SettingsInitialState } from '../../store/reducers/settings';
import { cloneDeep } from 'lodash';

const Settings = ({
  actions,
  settings,
}: {
  actions: any;
  settings: SettingsInitialState;
}) => {
  const [localSettingsInfo, setSettingsInfo] = useState(
    cloneDeep(settings.settingsInfo),
  );

  const setSettingsInfoCallback = (
    fieldName1: string,
    fieldValue1: boolean | string,
    fieldName2: string | null,
    fieldValue2: boolean | string | null,
  ) => {
    setSettingsInfo({ ...localSettingsInfo, [fieldName1]: fieldValue1 });
    if (fieldName2 && fieldValue2) {
      setSettingsInfo({ ...localSettingsInfo, [fieldName2]: fieldValue2 });
    }
    actions.updateSettingsInfo(localSettingsInfo);
  };

  if (settings.settingsInfo.hideMap) {
    setSettingsInfoCallback('defaultViewMode', 'hideMap', null, null);
  } else if (settings.settingsInfo.hideDetails) {
    setSettingsInfoCallback('defaultViewMode', 'hideDetails', null, null);
  }

  if (settings.settingsInfo.hideRequests) {
    setSettingsInfoCallback('defaultViewMode', 'hideRequests', null, null);
  } else if (settings.settingsInfo.hideVolunteers) {
    setSettingsInfoCallback('defaultViewMode', 'hideVolunteers', null, null);
  }

  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <Icon
              as={Ionicons}
              name="options"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          </Pressable>
        );
      }}
    >
      <Menu.OptionGroup
        defaultValue={settings.settingsInfo.defaultViewMode}
        title="View"
        type="radio"
      >
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback('hideMap', false, 'hideDetails', false)
          }
          value="showAll"
        >
          Show all
        </Menu.ItemOption>
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback('hideMap', true, 'hideDetails', false)
          }
          value="hideMap"
        >
          Show details only
        </Menu.ItemOption>
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback('hideMap', false, 'hideDetails', true)
          }
          value="hideDetails"
        >
          Show map only
        </Menu.ItemOption>
      </Menu.OptionGroup>
      <Divider mt="3" w="100%" />
      <Menu.OptionGroup
        defaultValue={settings.settingsInfo.defaultType}
        title="Type"
        type="radio"
      >
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback(
              'hideRequests',
              false,
              'hideVolunteers',
              false,
            )
          }
          value="showAll"
        >
          Show all
        </Menu.ItemOption>
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback(
              'hideRequests',
              true,
              'hideVolunteers',
              false,
            )
          }
          value="hideRequests"
        >
          Show volunteers only
        </Menu.ItemOption>
        <Menu.ItemOption
          onPress={() =>
            setSettingsInfoCallback(
              'hideRequests',
              false,
              'hideVolunteers',
              true,
            )
          }
          value="hideVolunteers"
        >
          Show requests only
        </Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  );
};

const selector = createSelector(
  (state: any) => state.settings,
  (settings: SettingsInitialState) => ({ settings }),
);

export default connect(selector, bindDispatch)(Settings);
