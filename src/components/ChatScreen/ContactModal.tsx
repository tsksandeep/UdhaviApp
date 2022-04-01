import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Modal } from 'native-base';
import { Divider } from 'native-base';
import { PhoneNumber } from 'expo-contacts';
import { css } from '@emotion/native';
import structuredClone from '@ungap/structured-clone';

import Button from '../../components/Button/Button';

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

const ContactModal = (props: any) => {
  const [contactSelected, setContactSelected] = useState<any>({});
  const [contactSelectedCount, setContactSelectedCount] = useState(0);

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
            ContactModalStyle.modalTextWrapper,
            {
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text
            key={0}
            style={[ContactModalStyle.modalText, { color: textColor }]}
          >
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
    <Modal
      isOpen={props.showContactModal}
      onClose={() => {
        props.setShowContactModal(false);
        setContactSelected({});
        setContactSelectedCount(0);
      }}
    >
      <Modal.Content style={{ width: '90%' }}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text style={ContactModalStyle.modalHeading}>
            {`Select Contacts (${contactSelectedCount})`}
          </Text>
          <Button
            style={ContactModalStyle.contactSendButton}
            onPress={() => {
              Object.values(contactSelected).forEach((contact: any) => {
                props.onSendFromUser([{ sharedContact: contact }]);
              });
              setContactSelected({});
              setContactSelectedCount(0);
              props.setShowContactModal(false);
            }}
          >
            Send
          </Button>
        </Modal.Header>
        <Modal.Body>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.contacts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderContactListItem}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const ContactModalStyle = {
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

export default ContactModal;
