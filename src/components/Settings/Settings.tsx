import React from 'react';
import { Pressable } from 'react-native';
import { Divider, Icon, Menu } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

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
  const settingsInfo = settings.settingsInfo;

  const MenuOptionItem = (props: settingsDataItem) => {
    const { itemValue, elementValue, entity } = props;
    return (
      <Menu.ItemOption
        onPress={() => {
          if (entity == 'view') {
            actions.updateSettingsInfo({
              view: elementValue,
              type: settingsInfo.type,
            });
            return;
          }
          actions.updateSettingsInfo({
            view: settingsInfo.view,
            type: elementValue,
          });
        }}
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
        {items.map((item: settingsDataItem, index) => {
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
        defaultValue={settingsInfo.view}
      />
      {/* Use Requestor flow logic */}
      {/* <Divider mt="3" w="100%" />
          <MenuOptionGroup
            key={1}
            {...settingsData[1]}
            defaultValue={settingsInfo.type}
          /> */}
    </Menu>
  );
};

const selector = createSelector(
  (state: any) => state.settings,
  (settings: SettingsInitialState) => ({ settings }),
);

export default connect(selector, bindDispatch)(Settings);
