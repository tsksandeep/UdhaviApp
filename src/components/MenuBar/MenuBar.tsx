import React from 'react';
import { Text } from 'react-native';
import { HStack, View } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { css } from '@emotion/native';
import BackButton from '../BackButton/BackButton';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import bindDispatch from '../../utils/actions';
import { AppInitialState } from '../../store/reducers/app';

const totalStatusBarHeight = (getStatusBarHeight() - 30).toString();

const MenuBar = ({
  actions,
  app,
  showBackButton,
  showOnlyBackButton,
}: {
  actions: any;
  app: AppInitialState;
  showBackButton: boolean;
  showOnlyBackButton?: boolean;
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={MenuBarStyle.container}>
      <HStack alignItems="center" justifyContent="space-between">
        {showBackButton || showOnlyBackButton ? (
          <BackButton key={0} />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={40}
            color="#232323"
            key={0}
          />
        )}
        {!showOnlyBackButton ? (
          <>
            <Text key={1} style={MenuBarStyle.header}>
              Udhavi
            </Text>
            <HStack
              key={2}
              alignItems="center"
              justifyContent="space-between"
              space={3}
            >
              <Ionicons
                name="notifications"
                size={32}
                color="#232323"
                onPress={() => navigation.navigate('Notification')}
              />
              <Entypo
                name="chat"
                size={32}
                color="#232323"
                onPress={() =>
                  navigation.navigate('Chat', {
                    groupId: 'AU7xdWTe0CBEnPoTGy1c', // temporary
                    userData: app.user,
                  })
                }
              />
            </HStack>
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
    position: relative;
    left: 16px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MenuBar);
