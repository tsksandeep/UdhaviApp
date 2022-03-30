import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HStack, Modal as BaseModal } from 'native-base';
import { css } from '@emotion/native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { TextInput as Input } from 'react-native-paper';

import Button from '../Button/Button';
import { RequestData } from '../../firebase/model';
import bindDispatch from '../../utils/actions';
import { deleteRequestData, updateRequestData } from '../../firebase/requests';
import { RequestStatesMap } from '../../constants/constants';
import { AppInitialState } from '../../store/reducers/app';

const RequestDataModal = ({
  actions,
  app,
  request,
  showModal,
  setShowModalCallback,
}: {
  actions: any;
  app: AppInitialState;
  request: RequestData;
  showModal: boolean;
  setShowModalCallback: Function;
}) => {
  const reopenCallback = () => {
    let requestUpdate = app.requestsMap.get(request.id);
    if (!requestUpdate) {
      return;
    }
    requestUpdate.status = RequestStatesMap.New;
    app.requestsMap.set(requestUpdate.id, requestUpdate);
    updateRequestData(requestUpdate.id, {
      status: RequestStatesMap.New,
    });
    actions.updateRequestsMap(app.requestsMap);
    setShowModalCallback(false);
  };

  // TODO
  const updateCallback = () => {};

  const cancelCallback = () => {
    let requestUpdate = app.requestsMap.get(request.id);
    if (!requestUpdate) {
      return;
    }
    requestUpdate.status = RequestStatesMap.Cancelled;
    app.requestsMap.set(requestUpdate.id, requestUpdate);
    updateRequestData(requestUpdate.id, {
      status: RequestStatesMap.Cancelled,
    });
    actions.updateRequestsMap(app.requestsMap);
    setShowModalCallback(false);
  };

  const deleteCallback = () => {
    app.requestsMap.delete(request.id);
    deleteRequestData(request.id);
    actions.updateRequestsMap(app.requestsMap);
    setShowModalCallback(false);
  };

  const RequestModalButtons = () => {
    if (request.status === RequestStatesMap.Cancelled) {
      return (
        <>
          <Button
            style={RequestDataModalStyle.updateButton}
            onPress={reopenCallback}
          >
            REOPEN
          </Button>
          <Button
            style={RequestDataModalStyle.cancelButton}
            onPress={deleteCallback}
          >
            DELETE
          </Button>
        </>
      );
    }
    return (
      <>
        <Button
          style={RequestDataModalStyle.updateButton}
          onPress={updateCallback}
        >
          UPDATE
        </Button>
        <Button
          style={RequestDataModalStyle.cancelButton}
          onPress={cancelCallback}
        >
          CANCEL
        </Button>
      </>
    );
  };

  return (
    <Modal isVisible={showModal} animationInTiming={1} animationOutTiming={1}>
      <BaseModal.Content maxWidth="400px">
        <TouchableOpacity></TouchableOpacity>
        <BaseModal.Header style={RequestDataModalStyle.header}>
          <Text style={RequestDataModalStyle.heading}> Request Data</Text>
          <TouchableOpacity
            style={RequestDataModalStyle.closeButton}
            onPress={() => setShowModalCallback(false)}
          >
            <AntDesign name="closecircle" size={24} color="#fff" />
          </TouchableOpacity>
        </BaseModal.Header>
        <BaseModal.Body style={RequestDataModalStyle.body}>
          <View style={RequestDataModalStyle.field}>
            <Text style={RequestDataModalStyle.data}>Name: </Text>
            <Input
              style={RequestDataModalStyle.input}
              selectionColor="#560cce"
              defaultValue={request.name}
              children={undefined}
              autoComplete={undefined}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
            />
          </View>
          <View style={RequestDataModalStyle.field}>
            <Text style={RequestDataModalStyle.data}>Phone Number: </Text>
            <Input
              style={RequestDataModalStyle.input}
              selectionColor="#560cce"
              defaultValue={request.phoneNumber}
              children={undefined}
              autoComplete={undefined}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
            />
          </View>
          <Text style={RequestDataModalStyle.data}>
            Date: {new Date(request.date).toUTCString()}
          </Text>
          <View style={RequestDataModalStyle.field}>
            <Text style={RequestDataModalStyle.data}>Info: </Text>
            <Input
              style={RequestDataModalStyle.input}
              selectionColor="#560cce"
              defaultValue={request.info}
              children={undefined}
              autoComplete={undefined}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
            />
          </View>
          <View style={RequestDataModalStyle.field}>
            <Text style={RequestDataModalStyle.data}>Notes: </Text>
            <Input
              style={RequestDataModalStyle.input}
              selectionColor="#560cce"
              defaultValue={request.notes}
              children={undefined}
              autoComplete={undefined}
              activeUnderlineColor="transparent"
              underlineColor="transparent"
            />
          </View>
          <Text style={RequestDataModalStyle.data}>
            Status: {request.status}
          </Text>
          <HStack alignItems={'center'} justifyContent={'center'}>
            <RequestModalButtons />
          </HStack>
        </BaseModal.Body>
      </BaseModal.Content>
    </Modal>
  );
};

const RequestDataModalStyle = {
  header: css`
    border-bottom-width: 1px;
    background: #5f27cd;
  `,
  closeButton: css`
    position: absolute;
    right: 10px;
    top: 14px;
    z-index: 999;
  `,
  heading: css`
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    position: relative;
    right: 10px;
    text-transform: uppercase;
    color: #fff;
  `,
  body: css`
    padding: 4px 10px 0px 10px;
  `,
  data: css`
    font-weight: 500;
    margin: 5px 0;
    font-size: 16px;
  `,
  updateButton: css`
    margin: 10px;
    background: #0984e3;
    font-weight: 500;
  `,
  cancelButton: css`
    margin: 10px;
    background: #ee5253;
    font-weight: 500;
  `,
  input: css`
    flex: 1;
    height: 30px;
    background-color: #fff;
    border-radius: 10px;
    shadow-offset: 2px;
    shadow-color: #171717;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
  `,
  field: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(RequestDataModal);
