import React from 'react';
import { Pressable, Badge, HStack } from 'native-base';

import { RequestsMap } from '../../store/reducers/updateRequests';
import { VolunteersMap } from '../../store/reducers/updateVolunteers';
import { PendingSelection } from '../../store/reducers/pendingSelection';

interface ReleaseHeaderProps {
  actions: any;
  requests: RequestsMap;
  volunteers: VolunteersMap;
  pendingSelection: PendingSelection;
  entityId: string;
  releaseCallback: Function;
  releaseAllCallback: Function;
}

const ReleaseHeader = (props: ReleaseHeaderProps) => {
  return (
    <HStack>
      <Pressable
        onPress={() => {
          props.releaseCallback(
            props.actions,
            props.requests,
            props.volunteers,
            props.pendingSelection,
            props.entityId,
          );
          props.actions.updateAssignmentOrReleaseSummary(true);
        }}
      >
        <Badge style={{ margin: 3 }} colorScheme="danger" variant="outline">
          Release
        </Badge>
      </Pressable>
      <Pressable
        onPress={() => {
          props.releaseAllCallback(
            props.actions,
            props.requests,
            props.volunteers,
            props.entityId,
          );
          props.actions.updateAssignmentOrReleaseSummary(true);
        }}
      >
        <Badge style={{ margin: 3 }} colorScheme="danger" variant="solid">
          Release All
        </Badge>
      </Pressable>
    </HStack>
  );
};

export default ReleaseHeader;
