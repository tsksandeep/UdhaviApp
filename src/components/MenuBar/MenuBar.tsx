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
import { TouchableOpacity } from 'react-native';

const totalStatusBarHeight = (getStatusBarHeight() - 10).toString();

const MenuBar = ({
  actions,
  app,
  showBackButton,
  showOnlyBackButton,
  showContainerShadow,
}: {
  actions: any;
  app: AppInitialState;
  showBackButton: boolean;
  showOnlyBackButton?: boolean;
  showContainerShadow?: boolean;
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  var containerStyles = [MenuBarStyle.container];
  if (showContainerShadow) {
    containerStyles.push(MenuBarStyle.containerShadow);
  }

  const HeaderEntity = () => {
    return (
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
    );
  };

  return (
    <View style={containerStyles}>
      <HStack alignItems="center" justifyContent="space-between">
        {showBackButton || showOnlyBackButton ? (
          <BackButton key={0} />
        ) : (
          <TouchableOpacity
            key={0}
            onPress={() => navigation.navigate('Profile')}
          >
            <MaterialIcons name="account-circle" size={40} color="#232323" />
          </TouchableOpacity>
        )}
        {showOnlyBackButton ? <></> : <HeaderEntity />}
      </HStack>
    </View>
  );
};

const MenuBarStyle = {
  container: css`
    padding: ${totalStatusBarHeight}px 10px 5px 10px;
    margin-bottom: 5px;
    z-index: 999;
    background: #fdf6e4;
  `,
  containerShadow: css`
    shadow-offset: 1px;
    shadow-color: #171717;
    shadow-opacity: 0.2;
    shadow-radius: 3px;
  `,
  header: css`
    font-family: 'Pacifico';
    font-size: 35px;
    color: #560cce;
    position: relative;
    left: -10px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MenuBar);
