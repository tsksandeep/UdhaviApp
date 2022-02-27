// Should rename the entire component as menu

import React from 'react';
import { Pressable, Text } from 'react-native';
import { Divider, HStack, Icon, Menu, View } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { settingsData, settingsDataType, settingsDataItem } from './data';
import bindDispatch from '../../utils/actions';
import { SettingsInitialState } from '../../store/reducers/settings';
import { css } from '@emotion/native';

const totalStatusBarHeight = (10 + getStatusBarHeight()).toString();

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
    <View style={SettingsStyle.container}>
      <HStack alignItems="center" justifyContent="space-between">
        <MaterialIcons
          style={SettingsStyle.account}
          name="account-circle"
          size={40}
          color="#232323"
        />
        <Text style={SettingsStyle.header}>Udhavi</Text>
        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Icon
                  style={SettingsStyle.menu}
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
      </HStack>
    </View>
  );
};

const SettingsStyle = {
  container: css`
    top: ${totalStatusBarHeight};
  `,
  account: css`
    margin-left: 10px;
  `,
  menu: css`
    margin-right: 10px;
  `,
  header: css`
    font-family: 'Pacifico';
    font-size: 35px;
    color: #560cce;
  `,
};

const selector = createSelector(
  (state: any) => state.settings,
  (settings: SettingsInitialState) => ({ settings }),
);

export default connect(selector, bindDispatch)(Settings);
