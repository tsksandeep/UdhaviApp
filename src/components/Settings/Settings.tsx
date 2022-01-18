import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Divider, Icon, Menu } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import { settingsData, settingsDataType, settingsDataItem } from './data';
import bindDispatch from '../../utils/actions';
import { SettingsInitialState } from '../../store/reducers/settings';

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

  if (localSettingsInfo.hideMap) {
    setSettingsInfoCallback('defaultViewMode', 'hideMap', null, null);
  } else if (localSettingsInfo.hideDetails) {
    setSettingsInfoCallback('defaultViewMode', 'hideDetails', null, null);
  }

  if (localSettingsInfo.hideRequests) {
    setSettingsInfoCallback('defaultViewMode', 'hideRequests', null, null);
  } else if (localSettingsInfo.hideVolunteers) {
    setSettingsInfoCallback('defaultViewMode', 'hideVolunteers', null, null);
  }

  const MenuOptionItem = (props: settingsDataItem) => {
    const { itemValue, elementValue, callbackValues } = props;
    return (
      <Menu.ItemOption
        onPress={() =>
          setSettingsInfoCallback(
            callbackValues.fieldName1,
            callbackValues.fieldValue1,
            callbackValues.fieldName2,
            callbackValues.fieldValue2,
          )
        }
        value={elementValue}
      >
        {itemValue}
      </Menu.ItemOption>
    );
  };

  const MenuOptionGroup = (props: settingsDataType) => {
    const { defaultValue, title, items } = props;
    return (
      <Menu.OptionGroup defaultValue={defaultValue} title={title} type="radio">
        {items.map((item, index) => {
          return <MenuOptionItem key={index} {...item} />;
        })}
      </Menu.OptionGroup>
    );
  };

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
      <MenuOptionGroup
        key={0}
        {...settingsData[0]}
        defaultValue={localSettingsInfo.defaultViewMode}
      />
      <Divider mt="3" w="100%" />
      <MenuOptionGroup
        key={1}
        {...settingsData[1]}
        defaultValue={localSettingsInfo.defaultType}
      />
    </Menu>
  );
};

const selector = createSelector(
  (state: any) => state.settings,
  (settings: SettingsInitialState) => ({ settings }),
);

export default connect(selector, bindDispatch)(Settings);
