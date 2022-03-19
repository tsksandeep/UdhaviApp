import React, { useCallback, useState } from 'react';
import RequestSlider from '../RequestSlider/RequestSlider';
import MenuBar from '../MenuBar/MenuBar';
import CategoryList from '../CategoryList/CategoryList';
import UserLocation from '../UserLocation/UserLocation';
import LocationSlider from '../LocationSlider/LocationSlider';
import { ScrollView, RefreshControl } from 'react-native';
import { getExistingRequests } from '../../store/shared/shared';
import { css } from '@emotion/native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import bindDispatch from '../../utils/actions';
import { AppInitialState } from '../../store/reducers/app';

const DashboardComponent = ({
  actions,
  app,
}: {
  actions: any;
  app: AppInitialState;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showLocationSlider, setShowLocationSlider] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const requests = await getExistingRequests(app.user.phoneNumber);
    actions.updateRequestsMap(requests);
    setRefreshing(false);
  };

  const requestSliderBackdropComponent = useCallback(() => {
    return (
      <ScrollView
        contentContainerStyle={DashboardComponentStyle.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pulling latest updates..."
          />
        }
      >
        <MenuBar showBackButton={false} />
        <UserLocation setShowLocationSlider={setShowLocationSlider} />
        <CategoryList />
      </ScrollView>
    );
  }, []);

  return (
    <>
      {showLocationSlider ? (
        <LocationSlider
          backdropComponent={requestSliderBackdropComponent}
          setShowLocationSlider={setShowLocationSlider}
          showLocationSlider={showLocationSlider}
        />
      ) : (
        <RequestSlider backdropComponent={requestSliderBackdropComponent} />
      )}
    </>
  );
};

const DashboardComponentStyle = {
  scrollView: css`
    flex: 1;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(DashboardComponent);
