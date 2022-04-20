import React from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';

import MenuBar from '../components/MenuBar/MenuBar';
import ChatList from '../components/ChatList/ChatList';

const ChatGroup = (props: any) => {
  const userData = props.route.params.userData;

  if (!userData) {
    return <></>;
  }

  return (
    <View style={ChatGroupStyle.container}>
      <MenuBar showBackButton={true} showContainerShadow />
      <ChatList userData={userData} />
    </View>
  );
};

const ChatGroupStyle = {
  container: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
};

export default ChatGroup;
