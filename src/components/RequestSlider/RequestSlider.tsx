import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { css } from '@emotion/native';
import { createSelector } from 'reselect';
import { AppInitialState } from '../../store/reducers/app';
import RequestList from '../RequestList/RequestList';
import { connect } from 'react-redux';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import bindDispatch from '../../utils/actions';
import SliderHandle from '../SliderHandle/SliderHandle';

const RequestSlider = ({
  app,
  volunteerSelection,
  backdropComponent,
}: {
  app: AppInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
  backdropComponent: any;
}) => {
  const flatlistRef = useRef<BottomSheetFlatListMethods>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  return (
    <View style={RequestFormSliderStyles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        animateOnMount={true}
        backdropComponent={backdropComponent}
        onChange={handleSheetChanges}
        handleComponent={SliderHandle}
        handleStyle={RequestFormSliderStyles.handleStyle}
      >
        <RequestList
          flatlistRef={flatlistRef}
          mode={'all'}
          volunteerSelected={volunteerSelection}
          requestsMap={app.requestsMap}
        />
      </BottomSheet>
    </View>
  );
};

const RequestFormSliderStyles = {
  container: css`
    width: 100%;
    flex: 1;
    padding: 24px;
    background: #fdf6e4;
  `,
  handleStyle: css`
    height: 40px;
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

export default connect(selector, bindDispatch)(RequestSlider);
