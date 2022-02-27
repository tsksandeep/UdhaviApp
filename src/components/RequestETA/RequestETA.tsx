import React, { useState } from 'react';
import {
  Badge,
  Button,
  FormControl,
  Input,
  Modal,
  Pressable,
  View,
} from 'native-base';
import { RequestData } from '../../firebase/model';
import { RequestsMap } from '../../store/reducers/app';
import { css } from '@emotion/native';

const RequestETA = (props: {
  actions: any;
  request: RequestData;
  requests: RequestsMap;
}) => {
  const { actions, request, requests } = props;
  const [showModal, setShowModal] = useState(false);
  const [etaText, setEtaText] = useState('');

  return (
    <View style={RequestEtaStyle.container}>
      <Pressable>
        <Badge colorScheme="default" variant={'outline'} alignSelf="center">
          {request.eta ? request.eta : 'ETA'}
        </Badge>
      </Pressable>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Provide ETA</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input onChangeText={(v) => setEtaText(v)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  request.eta = etaText;
                  requests[request.id] = request;
                  actions.updateRequestsMap(requests);
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

const RequestEtaStyle = {
  container: css`
    margin-right: 10px;
  `,
};

export default RequestETA;
