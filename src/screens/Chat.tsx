import React, { useState, useEffect } from 'react';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Actions,
  Composer,
  ComposerProps,
} from 'react-native-gifted-chat';
import { onSendChatCallback, unsubscribeChatCallback } from '../firebase/chat';
import { getMessagesRef } from '../firebase/ref';
import MenuBar from '../components/MenuBar/MenuBar';
import {
  Platform,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import { Modal, Divider } from 'native-base';
import { css } from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import {
  getLocationAsync,
  pickFileAsync,
  pickImageAsync,
  takePictureAsync,
  getAllContacts,
} from '../common/mediaUtils';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import RequestDefaultMarker from '../assets/marker/Request_default_marker.png';
import { Contact, PhoneNumber } from 'expo-contacts';
import structuredClone from '@ungap/structured-clone';
import Button from '../components/Button/Button';

const LocationCustomView = (props: any) => {
  const openMaps = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `http://maps.google.com/?q=${latitude},${longitude}`,
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
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: props.latitude,
              longitude: props.longitude,
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

const FileCustomView = (props: any) => {
  return (
    <View style={ChatStyle.fileView}>
      <Text style={ChatStyle.fileText}>{props.filename}</Text>
    </View>
  );
};

const ContactCustomView = (props: any) => {
  console.log(props);
  return (
    <View style={ChatStyle.contactView}>
      <Text key={0} style={ChatStyle.contactText}>
        {props.name}
      </Text>
      {props.phoneNumbers.map((number: string, index: number) => {
        return (
          <Text key={index + 1} style={ChatStyle.contactText}>
            {number}
          </Text>
        );
      })}
    </View>
  );
};

const CustomView = (props: any) => {
  const { currentMessage } = props;

  if (currentMessage.location) {
    return (
      <LocationCustomView
        latitude={currentMessage.location.latitude}
        longitude={currentMessage.location.longitude}
      />
    );
  }

  if (currentMessage.file) {
    let filename: string = currentMessage.file.substring(
      currentMessage.file.lastIndexOf('/') + 1,
    );
    return <FileCustomView filename={filename} />;
  }

  if (currentMessage.sharedContact) {
    let name = currentMessage.sharedContact.firstName;
    if (currentMessage.sharedContact.lastName) {
      name += ' ' + currentMessage.sharedContact.lastName;
    }

    let phoneNumbers: any = [];
    currentMessage.sharedContact.phoneNumbers.forEach((phoneNumber: any) => {
      phoneNumbers.push(phoneNumber.number);
    });

    return <ContactCustomView name={name} phoneNumbers={phoneNumbers} />;
  }

  return null;
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

  const [contactSelected, setContactSelected] = useState<any>({});
  const [contactSelectedCount, setContactSelectedCount] = useState(0);
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

  const renderSend = (props: any) => {
    return <Send {...props} containerStyle={ChatStyle.sendButton} />;
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

  const renderActions = (props: any) => {
    return (
      <Actions
        {...props}
        containerStyle={ChatStyle.actionButton}
        icon={() => {
          return <Ionicons name="add-circle" size={30} color="#1A66D2" />;
        }}
        options={{
          Camera: () => {
            takePictureAsync(onSendFromUser, setTransferring, setTransferred);
          },
          Contact: async () => {
            const contacts = await getAllContacts();
            if (!contacts) {
              return;
            }
            setContacts(contacts);
            setShowContactModal(true);
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

  const getNumber = (item: any) => {
    let phoneNumbers = item.phoneNumbers;
    if (!phoneNumbers || phoneNumbers.length === 0) {
      return null;
    }

    let number = phoneNumbers[0].number;
    if (!number) {
      return null;
    }

    return number;
  };

  const onPressContactCallback = (item: any) => {
    let number = getNumber(item);
    if (!number) {
      return;
    }

    if (number in contactSelected) {
      let contactsSelectedTemp = structuredClone(contactSelected);
      delete contactsSelectedTemp[number];
      setContactSelected(contactsSelectedTemp);
      setContactSelectedCount(contactSelectedCount - 1);
      return;
    }

    let contactsSelectedTemp = structuredClone(contactSelected);
    contactsSelectedTemp[number] = item;
    setContactSelected(contactsSelectedTemp);
    setContactSelectedCount(contactSelectedCount + 1);
  };

  const renderContactListItem = ({ item }: { item: any }) => {
    let name = item.firstName;
    if (item.lastName) {
      name += ' ' + item.lastName;
    }

    let textColor = '#000';
    let bgColor = 'rgba(0,0,0,0)';

    let number = getNumber(item);
    if (number && number in contactSelected) {
      textColor = '#fff';
      bgColor = '#1A66D2';
    }

    return (
      <TouchableOpacity onPress={() => onPressContactCallback(item)}>
        <View
          style={[
            ChatStyle.modalTextWrapper,
            {
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text key={0} style={[ChatStyle.modalText, { color: textColor }]}>
            {name}
          </Text>
          {item.phoneNumbers?.map((value: PhoneNumber, index: number) => (
            <Text style={{ color: textColor }} key={index + 1}>
              {value.number}
            </Text>
          ))}
        </View>
        <Divider />
      </TouchableOpacity>
    );
  };

  return (
    <View style={ChatStyle.container}>
      <MenuBar showBackButton={true} showContainerShadow />
      <Modal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setContactSelected({});
          setContactSelectedCount(0);
        }}
      >
        <Modal.Content style={{ width: '90%' }}>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={ChatStyle.modalHeading}>
              {`Select Contacts (${contactSelectedCount})`}
            </Text>
            <Button
              style={ChatStyle.contactSendButton}
              onPress={() => {
                Object.values(contactSelected).forEach((contact: any) => {
                  onSendFromUser([{ sharedContact: contact }]);
                });
                setContactSelected({});
                setContactSelectedCount(0);
                setShowContactModal(false);
              }}
            >
              Send
            </Button>
          </Modal.Header>
          <Modal.Body>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={contacts}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderContactListItem}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
    padding: 0 5px;
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
  fileView: css`
    width: 200px;
    margin: 2px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border-top-left-radius: 13px;
    padding: 10px 8px;
  `,
  fileText: css`
    color: #fff;
    font-weight: 500;
  `,
  contactView: css`
    width: 200px;
    margin: 2px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border-top-left-radius: 13px;
    padding: 10px 8px;
  `,
  contactText: css`
    color: #fff;
    font-weight: 500;
    margin: 2px 0;
  `,
  modalHeading: css`
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    position: relative;
    right: 10px;
  `,
  modalTextWrapper: css`
    width: 100%;
    margin: 5px 0;
    padding: 10px;
    border-radius: 10px;
  `,
  modalText: css`
    font-size: 17px;
    font-weight: 600;
  `,
  contactSendButton: css`
    margin: 10px auto;
    background: #1a66d2;
    border: none;
  `,
};

export default Chat;
