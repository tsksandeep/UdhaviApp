// Work in progress

import React, { useState, useEffect } from 'react';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  Actions,
} from 'react-native-gifted-chat';
import { onSendChatCallback, unsubscribeChatCallback } from '../firebase/chat';
import { getMessagesRef } from '../firebase/ref';
import MenuBar from '../components/MenuBar/MenuBar';
import { View } from 'react-native';
import { css } from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
} from '../common/mediaUtils';

const user = {
  _id: 1,
  name: 'Developer',
};

const Chat = (props: any) => {
  const groupId = props.route.params.groupId;
  const userData = props.route.params.userData;

  if (!groupId || !userData) {
    return <></>;
  }

  const [messages, setMessages] = useState([]);
  const messagesRef = getMessagesRef(groupId);

  useEffect(() => {
    unsubscribeChatCallback(messagesRef, setMessages);
  }, []);

  const onSend = (messages: IMessage[]) => {
    onSendChatCallback(messagesRef, messages, setMessages);
  };

  const renderSend = (props: any) => {
    return <Send {...props} containerStyle={ChatStyle.sendButton} />;
  };

  const onSendFromUser = (messages: IMessage[] = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    onSend(messagesToUpload);
  };

  const renderActions = (props: any) => {
    return (
      <Actions
        {...props}
        containerStyle={ChatStyle.actionButton}
        icon={() => {
          return <Ionicons name="add-circle" size={30} color="black" />;
        }}
        options={{
          Camera: () => takePictureAsync(onSendFromUser),
          Location: () => getLocationAsync(onSendFromUser),
          Library: () => pickImageAsync(onSendFromUser),
          Cancel: () => {},
        }}
        optionTintColor="#222B45"
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={ChatStyle.textPrimary}
        containerStyle={ChatStyle.textContainer}
      />
    );
  };

  return (
    <View style={ChatStyle.container}>
      <MenuBar showBackButton={true} showContainerShadow />
      <GiftedChat
        scrollToBottom
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        user={{
          _id: userData.userId,
          name: userData.name,
          avatar: 'https://i.pravatar.cc/300',
        }}
        messagesContainerStyle={ChatStyle.messageContainer}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderActions={renderActions}
      />
    </View>
  );
};

const ChatStyle = {
  container: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
  messageContainer: css`
    padding: 0 10px;
  `,
  textContainer: css`
    border-top-color: white;
    border-radius: 10px;
    font-size: 16px;
  `,
  textPrimary: css`
    color: white;
    position: relative;
    top: 3px;
  `,
  sendButton: css`
    position: relative;
    top: -3px;
  `,
  actionButton: css`
    width: 30px;
    height: 35px;
    position: relative;
    top: 3px;
  `,
};

export default Chat;
