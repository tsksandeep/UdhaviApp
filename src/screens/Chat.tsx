// Work in progress

import React, { useState, useEffect } from 'react';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  Actions,
  Composer,
  ComposerProps,
} from 'react-native-gifted-chat';
import { onSendChatCallback, unsubscribeChatCallback } from '../firebase/chat';
import { getMessagesRef } from '../firebase/ref';
import MenuBar from '../components/MenuBar/MenuBar';
import { Platform, TouchableOpacity, View, Image } from 'react-native';
import { css } from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import {
  getLocationAsync,
  pickFileAsync,
  pickImageAsync,
  takePictureAsync,
} from '../common/mediaUtils';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import RequestDefaultMarker from '../assets/marker/Request_default_marker.png';

const CustomView = (props: any) => {
  const { currentMessage } = props;
  if (!currentMessage.location) {
    return null;
  }

  const openMaps = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${currentMessage.location.latitude},${currentMessage.location.longitude}`,
      android: `http://maps.google.com/?q=${currentMessage.location.latitude},${currentMessage.location.longitude}`,
    });

    Linking.canOpenURL(url!)
      .then((supported: any) => {
        if (supported) {
          return Linking.openURL(url!);
        }
      })
      .catch((err: any) => {
        console.error('An error occurred', err);
      });
  };
  return (
    <TouchableOpacity onPress={openMaps} style={ChatStyle.mapViewContainer}>
      <View style={ChatStyle.mapViewWrapper}>
        <MapView
          style={ChatStyle.mapView}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          >
            <Image
              source={RequestDefaultMarker}
              style={{ height: 30, width: 30 }}
            />
          </Marker>
        </MapView>
      </View>
    </TouchableOpacity>
  );
};

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

  const [transferred, setTransferred] = useState(0.0);
  const [transferring, setTransferring] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesRef = getMessagesRef('AU7xdWTe0CBEnPoTGy1c');

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
          Camera: () => {
            takePictureAsync(onSendFromUser, setTransferring, setTransferred);
          },
          Document: () => {
            pickFileAsync(onSendFromUser, setTransferring, setTransferred);
          },
          Location: () => getLocationAsync(onSendFromUser),
          Library: () => {
            pickImageAsync(onSendFromUser, setTransferring, setTransferred);
          },
          Cancel: () => {},
        }}
        optionTintColor="#222B45"
      />
    );
  };

  const renderCustomView = (props: any) => {
    return <CustomView {...props} />;
  };

  const renderComposer = (props: ComposerProps) => {
    let placeholder = 'Send a message...';
    if (transferring) {
      placeholder = 'Uploading: ' + transferred.toString() + '%';
    }
    return <Composer {...props} placeholder={placeholder} />;
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
        user={user}
        messagesContainerStyle={ChatStyle.messageContainer}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderActions={renderActions}
        renderCustomView={renderCustomView}
        renderComposer={renderComposer}
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
  mapViewContainer: css`
    width: 150px;
    height: 150px;
    padding: 2px;
  `,
  mapViewWrapper: css`
    overflow: hidden;
    border-radius: 2px;
    border-top-left-radius: 13px;
  `,
  mapView: css`
    width: 100%;
    height: 100%;
  `,
};

export default Chat;
