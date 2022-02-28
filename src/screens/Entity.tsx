import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RequestFormComponent from '../components/RequestForm/RequestForm';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const totalStatusBarHeight = (10 + getStatusBarHeight()).toString();

const Entity = ({
  actions,
  app,
  volunteerSelection,
  fullscreen,
}: {
  actions: any;
  app: AppInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
  fullscreen: boolean;
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  let sceneMap = SceneMap({
    first: () => {
      return (
        <View style={EntityStyle.requestList}>
          <SafeAreaView style={EntityStyle.requests}>
            <KeyboardAwareScrollView>
              <RequestList
                mode={'all'}
                volunteerSelected={volunteerSelection}
                requestsMap={app.requestsMap}
              />
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </View>
      );
    },
    second: () => {
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView style={EntityStyle.submitRequest}>
            <KeyboardAwareScrollView>
              <RequestFormComponent showHeading={false} />
            </KeyboardAwareScrollView>
          </SafeAreaView>
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

  const EntityStyle = {
    container: css`
      height: 100%;
      background: white;
      top: ${totalStatusBarHeight}px;
    `,
    requestList: css`
      flex: 1;
    `,
    requests: css`
      ${fullscreen ? '' : 'height: 300px'};
    `,
    submitRequest: css`
      ${fullscreen ? '' : 'height: 300px'};
    `,
  };

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

const selector = createSelector(
  (state: any) => state.app,
  (state: any) => state.volunteerSelection,
  (
    app: AppInitialState,
    volunteerSelection: VolunteerSelectionInitialState,
  ) => ({ app, volunteerSelection }),
);

export default connect(selector, bindDispatch)(Entity);
