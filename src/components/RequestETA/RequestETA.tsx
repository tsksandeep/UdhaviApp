import React, { useState } from 'react';
import {
  Badge,
  Button,
  FormControl,
  Input,
  Modal,
  Pressable,
} from 'native-base';
import { RequestsMap } from '../../store/reducers/updateRequests';
import { RequestData } from '../../firebase/model';

const RequestETA = (
  actions: any,
  request: RequestData,
  requests: RequestsMap,
) => {
  const [showModal, setShowModal] = useState(false);
  const [etaText, setEtaText] = useState('');

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Badge colorScheme="default" variant={'outline'} alignSelf="center">
          {'ETA'}
          {request.ETA}
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
                  request.ETA = etaText;
                  requests[request.id] = request;
                  actions.updateRequests(requests);
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default RequestETA;
