import React from 'react';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';
import { css } from '@emotion/native';

import {
  getLocationAsync,
  pickFileAsync,
  pickImageAsync,
  takePictureAsync,
  getAllContacts,
} from '../../common/mediaUtils';
import CustomView from './CustomView';

export const RenderActions = (props: any) => {
  return (
    <Actions
      {...props}
      containerStyle={RenderEntityStyle.actionButton}
      icon={() => {
        return <Ionicons name="add-circle" size={30} color="#1A66D2" />;
      }}
      options={{
        Camera: () => {
          takePictureAsync(
            props.onSendFromUser,
            props.setTransferring,
            props.setTransferred,
          );
        },
        Contact: async () => {
          const contacts = await getAllContacts();
          if (!contacts) {
            return;
          }
          props.setContacts(contacts);
          props.setShowContactModal(true);
        },
        Document: () => {
          pickFileAsync(
            props.onSendFromUser,
            props.setTransferring,
            props.setTransferred,
          );
        },
        Location: () => getLocationAsync(props.onSendFromUser),
        Library: () => {
          pickImageAsync(
            props.onSendFromUser,
            props.setTransferring,
            props.setTransferred,
          );
        },
        Cancel: () => {},
      }}
      optionTintColor="#222B45"
    />
  );
};

export const RenderCustomView = (props: any) => <CustomView {...props} />;

export const RenderTime = (props: any) => {
  if (!props.currentMessage.createdAt) {
    return null;
  }

  var date = new Date(props.currentMessage.createdAt);
  var dateSplit = date.toLocaleString().split(' ');
  if (dateSplit.length !== 3) {
    return null;
  }
  var time = dateSplit[1].split(':');
  var hours = Number(time[0]);
  if (dateSplit[2] === 'PM') {
    hours -= 12;
  }

  return (
    <Text style={RenderEntityStyle.bubbleTime}>
      {hours}:{time[1]} {dateSplit[2]}
    </Text>
  );
};

export const RenderTicks = (props: any) => {
  const { currentMessage } = props;
  if (props.renderTicks) {
    return props.renderTicks(currentMessage);
  }
  if (currentMessage?.user._id !== props.user._id) {
    return null;
  }
  if (currentMessage.sent || currentMessage.received) {
    return (
      <View style={RenderEntityStyle.tickView}>
        {currentMessage.sent && <Text style={RenderEntityStyle.tick}>✓</Text>}
        {currentMessage.received && (
          <Text style={RenderEntityStyle.tick}>✓</Text>
        )}
      </View>
    );
  }
  return null;
};

export const RenderBubble = (props: any) => {
  return (
    <View style={RenderEntityStyle.bubbleContainer}>
      <TouchableOpacity
        onLongPress={() => {}}
        accessibilityTraits="text"
        {...props.touchableProps}
      >
        <View style={RenderEntityStyle.bubbleWrapper}>
          <View>
            {RenderCustomView(props)}
            <View style={RenderEntityStyle.bubbleFooter}>
              {RenderTime(props)}
              {RenderTicks(props)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const RenderComposer = (props: any) => {
  let placeholder = 'Send a message...';
  if (props.transferring) {
    placeholder = 'Uploading: ' + props.transferred.toString() + '%';
  }
  return <Composer {...props} placeholder={placeholder} />;
};

export const RenderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={RenderEntityStyle.textPrimary}
      containerStyle={RenderEntityStyle.textContainer}
    />
  );
};

export const RenderSend = (props: any) => {
  return <Send {...props} containerStyle={RenderEntityStyle.sendButton} />;
};

const RenderEntityStyle = {
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
  actionButton: css`
    width: 30px;
    height: 35px;
    position: relative;
    top: 3px;
  `,
  bubbleWrapper: css`
    min-height: 60px;
  `,
  bubbleContainer: css`
    display: flex;
    flex-direction: row;
    background: #1a66d2;
    border-radius: 20px;
    padding: 2px;
    min-height: 60px;
    min-width: 100px;
    max-width: 300px;
    margin: 0px 3px;
  `,
  bubbleFooter: css`
    min-width: 100px;
    padding: 4px 8px;
  `,
  bubbleTime: css`
    font-size: 11px;
    font-weight: 300;
    color: #fff;
    text-align: right;
  `,
  tickView: css`
    flex-direction: row;
  `,
  tick: css`
    background-color: transparent;
    color: white;
  `,
  sendButton: css`
    position: relative;
    top: -3px;
  `,
};
