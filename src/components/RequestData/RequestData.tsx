import React from 'react';
import { Text } from 'react-native';
import { Modal } from 'native-base';
import { RequestData } from '../../firebase/model';
import { css } from '@emotion/native';

const RequestDataModal = ({
  request,
  showModal,
  setShowModalCallback,
}: {
  request: RequestData;
  showModal: boolean;
  setShowModalCallback: Function;
}) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModalCallback(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          <Text style={RequestDataModalStyle.heading}> Request Data</Text>
        </Modal.Header>
        <Modal.Body>
          <Text style={RequestDataModalStyle.data}>Name: {request.name}</Text>
          <Text style={RequestDataModalStyle.data}>
            Phone Number: {request.phoneNumber}
          </Text>
          <Text style={RequestDataModalStyle.data}>
            Date: {new Date(request.date).toUTCString()}
          </Text>
          <Text style={RequestDataModalStyle.data}>Info: {request.info}</Text>
          <Text style={RequestDataModalStyle.data}>Notes: {request.notes}</Text>
          <Text style={RequestDataModalStyle.data}>
            Status: {request.status}
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const RequestDataModalStyle = {
  heading: css`
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    position: relative;
    right: 10px;
  `,
  data: css`
    font-weight: 500;
    margin: 5px 0;
    font-size: 16px;
  `,
};

export default RequestDataModal;
