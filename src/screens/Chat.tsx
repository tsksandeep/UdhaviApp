import React, { useState, useEffect, useCallback } from 'react';
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

  const renderSend = (props: any) => {
    return <Send {...props} containerStyle={ChatStyle.sendButton} />;
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
          'Choose From Library': () => {
            console.log('Choose From Library');
          },
          Cancel: () => {
            console.log('Cancel');
          },
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
