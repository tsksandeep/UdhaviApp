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
import { AppInitialState } from '../store/reducers/app';
import Request from './Request';

const Entity = ({
  actions,
  app,
  volunteerSelection,
}: {
  actions: any;
  app: AppInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  let sceneMap = SceneMap({
    first: () => {
      return (
        <View style={{ flex: 1 }}>
          <RequestList
            mode={'all'}
            volunteerSelected={volunteerSelection}
            requestsMap={app.requestsMap}
          />
        </View>
      );
    },
    second: () => {
      return (
        <View style={{ flex: 1 }}>
          <Request showHeading={false} />
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
      title: `Submit Request`,
    },
  ];

  return (
    <>
      <View style={EntityStyle.container}>
        <EntityTab
          selectedIndex={currentTabIndex}
          sceneMap={sceneMap}
          tabHeaderMap={tabHeaderMap}
          onTabChange={(tabId: number) => setCurrentTabIndex(tabId)}
        />
      </View>
    </>
  );
};

const EntityStyle = {
  container: css`
    height: 100%;
    background: white;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (state: any) => state.volunteerSelection,
  (
    app: AppInitialState,
    volunteerSelection: VolunteerSelectionInitialState,
  ) => ({ app, volunteerSelection }),
);

export default connect(selector, bindDispatch)(Entity);
