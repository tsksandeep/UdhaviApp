import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';
import { SceneMap } from 'react-native-tab-view';

import bindDispatch from '../utils/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import RequestList from '../components/RequestList/RequestList';
import EntityTab from '../components/EntityTab/EntityTab';
import RequestFilter from '../components/RequestFilter/RequestFilter';
import { VolunteerSelectionInitialState } from '../store/reducers/volunteerSelection';
import { getVolunteerByID } from '../firebase/volunteers';
import { isAssignedToValid } from '../store/shared/shared';
import { RequestsInitialState } from '../store/reducers/updateRequests';
import Logo from '../components/Logo/Logo';

const Entity = ({
  actions,
  requests,
  volunteerSelection,
}: {
  actions: any;
  requests: RequestsInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
}) => {
  const [isInitialValuesSet, setInitialValues] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState<any>();

  useEffect(() => {
    const setInitialValuesCallback = async () => {
      const volunteer = await getVolunteerByID(
        volunteerSelection.volunteerSelected,
      );
      setCurrentTabIndex(isAssignedToValid(volunteer) ? 0 : 1);

      setInitialValues(true);
    };
    setInitialValuesCallback();
  }, []);

  let sceneMap = SceneMap({
    first: () => {
      return (
        <View style={{ flex: 1 }}>
          <RequestList
            mode={'all'}
            volunteerSelected={volunteerSelection}
            allRequests={requests}
          />
        </View>
      );
    },
    second: () => {
      return (
        <View style={{ flex: 1 }}>
          <RequestList
            mode={'all'}
            volunteerSelected={volunteerSelection}
            allRequests={requests}
          />
        </View>
      );
    },
  });

  const tabHeaderMap = [
    {
      key: 'first',
      title: `Requests`,
      filter: <RequestFilter />,
    },
    {
      key: 'second',
      title: `Volunteers`,
      filter: <RequestFilter />,
    },
  ];

  return (
    <>
      {isInitialValuesSet ? (
        <View style={EntityStyle.container}>
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

const EntityStyle = {
  container: css`
    height: 100%;
    background: white;
    padding: 150px 30px 0 30px;
  `,
};

const selector = createSelector(
  (state: any) => state.updateRequests,
  (state: any) => state.volunteerSelection,
  (
    requests: RequestsInitialState,
    volunteerSelection: VolunteerSelectionInitialState,
  ) => ({ requests, volunteerSelection }),
);

export default connect(selector, bindDispatch)(Entity);
