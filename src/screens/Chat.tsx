import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { onSendCallback, unsubscribeCallback } from '../firebase/chat';
import { getMessagesRef } from '../firebase/ref';

const Chat = (props: any) => {
  const groupId = props.route.params.groupId;
  const userData = props.route.params.userData;

  if (!groupId || !userData) {
    return <></>;
  }

  const [messages, setMessages] = useState([]);
  const messagesRef = getMessagesRef(groupId);

  useEffect(() => {
    unsubscribeCallback(messagesRef, setMessages);
  }, []);

  const onSend = useCallback(onSendCallback, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages: IMessage[]) =>
        onSend(messagesRef, messages, setMessages)
      }
      user={{
        _id: userData.userId,
        name: userData.name,
        // avatar: 'https://i.pravatar.cc/300',
      }}
    />
  );
};

export default Chat;
