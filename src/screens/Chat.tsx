import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';
import { css } from '@emotion/native';
import { Contact } from 'expo-contacts';

import { getMessagesRef } from '../firebase/ref';
import {
  RenderActions,
  RenderComposer,
  RenderBubble,
  RenderSend,
  RenderInputToolbar,
} from '../components/ChatScreen/RenderEntity';
import MenuBar from '../components/MenuBar/MenuBar';
import { onSendChatCallback, unsubscribeChatCallback } from '../firebase/chat';
import ContactModal from '../components/ChatScreen/ContactModal';

const Chat = (props: any) => {
  const groupId = props.route.params.groupId;
  const userData = props.route.params.userData;

  if (!groupId || !userData) {
    return <></>;
  }

  const user = {
    _id: userData.userId,
    name: userData.name,
    avatar: 'https://i.pravatar.cc/300',
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [transferred, setTransferred] = useState(0.0);
  const [transferring, setTransferring] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesRef = getMessagesRef('AU7xdWTe0CBEnPoTGy1c');

  useEffect(() => {
    unsubscribeChatCallback(messagesRef, setMessages);
  }, []);

  const onSend = (messages: any) => {
    onSendChatCallback(messagesRef, messages, setMessages);
  };

  const onSendFromUser = (messages: any = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map((message: any) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    onSend(messagesToUpload);
  };

  return (
    <View style={ChatStyle.container}>
      <MenuBar showBackButton={true} showContainerShadow />
      <ContactModal
        contacts={contacts}
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
        onSendFromUser={onSendFromUser}
      />
      <GiftedChat
        scrollToBottom
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        user={user}
        renderInputToolbar={RenderInputToolbar}
        renderSend={RenderSend}
        renderActions={() => (
          <RenderActions
            {...props}
            setContacts={setContacts}
            setShowContactModal={setShowContactModal}
            onSendFromUser={onSendFromUser}
            setTransferring={setTransferring}
            setTransferred={setTransferred}
          />
        )}
        renderComposer={(props: any) => (
          <RenderComposer
            {...props}
            transferring={transferring}
            transferred={transferred}
          />
        )}
        renderBubble={RenderBubble}
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
};

export default Chat;
