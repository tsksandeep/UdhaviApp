import React, { useState, useEffect, useCallback } from 'react';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { onSendChatCallback, unsubscribeChatCallback } from '../firebase/chat';
import { getMessagesRef } from '../firebase/ref';
import MenuBar from '../components/MenuBar/MenuBar';
import { View } from 'react-native';
import { css } from '@emotion/native';

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

  const onSend = useCallback(onSendChatCallback, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={ChatStyle.textPrimary}
        containerStyle={ChatStyle.textContainer}
      >
        <Send {...props} containerStyle={ChatStyle.sendButton} />
      </InputToolbar>
    );
  };

  return (
    <View style={ChatStyle.container}>
      <MenuBar showBackButton={true} />
      <GiftedChat
        scrollToBottom
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages: IMessage[]) =>
          onSend(messagesRef, messages, setMessages)
        }
        user={{
          _id: userData.userId,
          name: userData.name,
          avatar: 'https://i.pravatar.cc/300',
        }}
        messagesContainerStyle={ChatStyle.messageContainer}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const ChatStyle = {
  container: css`
    width: 100%;
    flex: 1;
    padding: 24px 10px;
    background: #fdf6e4;
  `,
  messageContainer: css``,
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
};

export default Chat;
