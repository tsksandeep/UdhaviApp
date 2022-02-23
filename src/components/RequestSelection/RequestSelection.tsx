import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import bindDispatch from '../../utils/actions';
import RequestList from '../RequestList/RequestList';
import {
  assignSelectedRequestsToVolunteer,
  isAssignedToValid,
  releaseAllRequestsFromVolunteer,
  releaseSelectedRequestsFromVolunteer,
} from '../../store/shared/shared';
import { RequestsInitialState } from '../../store/reducers/updateRequests';
import { VolunteersInitialState } from '../../store/reducers/updateVolunteers';
import { PendingSelectionInitialState } from '../../store/reducers/pendingSelection';
import { getVolunteerByID } from '../../firebase/volunteers';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import ReleaseHeader from '../ReleaseHeader/ReleaseHeader';
import AssignHeader from '../AssignHeader/AssignHeader';
import { getHeaderCountInfo } from '../../common/common';
import EntityTab from '../EntityTab/EntityTab';
import Logo from '../Logo/Logo';

const RequestSelection = ({
  requests,
  volunteers,
  volunteerSelection,
  pendingSelection,
  actions,
}: {
  requests: RequestsInitialState;
  volunteers: VolunteersInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
  pendingSelection: PendingSelectionInitialState;
  actions: any;
}) => {
  const [isInitialValuesSet, setInitialValues] = useState(false);
  const [headerCountInfo, setHeaderCountInfo] = useState<any>();
  const [currentTabIndex, setCurrentTabIndex] = useState<any>();

  useEffect(() => {
    const setInitialValuesCallback = async () => {
      const headerCountInfoVal = await getHeaderCountInfo(
        requests.requests,
        volunteerSelection.volunteerSelected,
        getVolunteerByID,
      );
      setHeaderCountInfo(headerCountInfoVal);

      const volunteer = await getVolunteerByID(
        volunteerSelection.volunteerSelected,
      );
      setCurrentTabIndex(isAssignedToValid(volunteer) ? 0 : 1);

      setInitialValues(true);
    };
    setInitialValuesCallback();
  }, []);

  var sceneMap = SceneMap({
    first: () => {
      return (
        <RequestList
          mode={'assigned'}
          volunteerSelected={volunteerSelection}
          allRequests={requests}
        />
      );
    },
    second: () => {
      return (
        <RequestList
          mode={'available'}
          volunteerSelected={volunteerSelection}
          allRequests={requests}
        />
      );
    },
  });

  var tabHeaderMap = [
    {
      key: 'first',
      title: `Assigned (${headerCountInfo?.assignedCount})`,
      tabElement: ReleaseHeader({
        actions: actions,
        requests: requests.requests,
        volunteers: volunteers.volunteers,
        pendingSelection: pendingSelection.pendingSelection,
        entityId: volunteerSelection.volunteerSelected,
        releaseCallback: releaseSelectedRequestsFromVolunteer,
        releaseAllCallback: releaseAllRequestsFromVolunteer,
      }),
    },
    {
      key: 'second',
      title: `Available (${headerCountInfo?.availableCount})`,
      tabElement: AssignHeader({
        actions: actions,
        requests: requests.requests,
        volunteers: volunteers.volunteers,
        pendingSelection: pendingSelection.pendingSelection,
        entityId: volunteerSelection.volunteerSelected,
        assignCallback: assignSelectedRequestsToVolunteer,
      }),
    },
  ];

  return (
    <>
      {isInitialValuesSet ? (
        <View style={{ flex: 1 }}>
          <EntityTab
            selectedIndex={currentTabIndex}
            sceneMap={sceneMap}
            tabHeaderMap={tabHeaderMap}
            onTabChange={(tabId: number) => setCurrentTabIndex(tabId)}
          />
        </View>
      ) : (
        <View>
          <Logo />
        </View>
      )}
    </>
  );
};

const selector = createSelector(
  (state: any) => state.updateRequests,
  (state: any) => state.updateVolunteers,
  (state: any) => state.volunteerSelection,
  (state: any) => state.pendingSelection,
  (
    requests: RequestsInitialState,
    volunteers: VolunteersInitialState,
    volunteerSelection: VolunteerSelectionInitialState,
    pendingSelection: PendingSelectionInitialState,
  ) => ({
    requests,
    volunteers,
    volunteerSelection,
    pendingSelection,
  }),
);

export default connect(selector, bindDispatch)(RequestSelection);
