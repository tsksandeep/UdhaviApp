import React from 'react';
import { Pressable, Badge } from 'native-base';
import { PendingSelection } from '../../store/reducers/pendingSelection';
import { RequestData, VolunteerData } from '../../firebase/model';

interface AssignHeaderProps {
  actions: any;
  requests: Map<string, RequestData>;
  volunteers: Map<string, VolunteerData>;
  pendingSelection: PendingSelection;
  entityId: string;
  assignCallback: Function;
}

const AssignHeader = (props: AssignHeaderProps) => {
  return (
    <Pressable
      onPress={() => {
        props.assignCallback(
          props.actions,
          props.requests,
          props.volunteers,
          props.pendingSelection,
          props.entityId,
        );
        props.actions.updateAssignmentOrReleaseSummary(true);
      }}
    >
      <Badge style={{ margin: 3 }} colorScheme="success" variant="solid">
        Assign
      </Badge>
    </Pressable>
  );
};

export default AssignHeader;
