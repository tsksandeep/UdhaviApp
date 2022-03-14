import React from 'react';
import { Text } from 'react-native';
import { HStack, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { css } from '@emotion/native';
import Settings from '../Settings/Settings';

const totalStatusBarHeight = (getStatusBarHeight() - 30).toString();

const MenuBar = () => {
  return (
    <View style={MenuBarStyle.container}>
      <HStack alignItems="center" justifyContent="center">
        {/* <MaterialIcons
          style={MenuBarStyle.account}
          name="account-circle"
          size={40}
          color="#232323"
        /> */}
        <Text style={MenuBarStyle.header}>Udhavi</Text>
        {/* <Settings /> */}
      </HStack>
    </View>
  );
};

const MenuBarStyle = {
  container: css`
    top: ${totalStatusBarHeight};
  `,
  account: css`
    margin-left: 10px;
  `,
  header: css`
    font-family: 'Pacifico';
    font-size: 35px;
    color: #560cce;
  `,
};

export default MenuBar;
