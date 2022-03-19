import React from 'react';
import { Text } from 'react-native';
import { HStack, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { css } from '@emotion/native';
import Settings from '../Settings/Settings';
import BackButton from '../BackButton/BackButton';

const totalStatusBarHeight = (getStatusBarHeight() - 30).toString();

const MenuBar = ({
  showBackButton,
  showOnlyBackButton,
}: {
  showBackButton: boolean;
  showOnlyBackButton?: boolean;
}) => {
  return (
    <View style={MenuBarStyle.container}>
      <HStack alignItems="center" justifyContent="space-between">
        {showBackButton || showOnlyBackButton ? (
          <BackButton />
        ) : (
          <MaterialIcons name="account-circle" size={40} color="#232323" />
        )}
        {!showOnlyBackButton ? (
          <>
            <Text style={MenuBarStyle.header}>Udhavi</Text>
            <Settings />
          </>
        ) : (
          <></>
        )}
      </HStack>
    </View>
  );
};

const MenuBarStyle = {
  container: css`
    top: ${totalStatusBarHeight}px;
  `,
  header: css`
    font-family: 'Pacifico';
    font-size: 35px;
    color: #560cce;
  `,
};

export default MenuBar;
