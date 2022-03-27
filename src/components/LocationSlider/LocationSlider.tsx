import React, { useMemo, useRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { css } from '@emotion/native';
import { AppInitialState } from '../../store/reducers/app';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import SliderHandle from '../SliderHandle/SliderHandle';
import GetLocation from '../../screens/GetLocation';

const LocationSlider = ({
  backdropComponent,
  setShowLocationSlider,
}: {
  actions?: any;
  app?: AppInitialState;
  volunteerSelection?: VolunteerSelectionInitialState;
  backdropComponent: any;
  setShowLocationSlider: any;
  showLocationSlider: boolean;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%'], []);

  const handleClose = () => {
    bottomSheetRef.current?.close();
    if (setShowLocationSlider) {
      setShowLocationSlider(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={RequestFormSliderStyles.keyboardContainer}
    >
      <View style={RequestFormSliderStyles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          animateOnMount={true}
          backdropComponent={backdropComponent}
          handleComponent={SliderHandle}
          handleStyle={RequestFormSliderStyles.handleStyle}
        >
          <GetLocation handleClose={handleClose} />
        </BottomSheet>
      </View>
    </KeyboardAvoidingView>
  );
};

const RequestFormSliderStyles = {
  container: css`
    flex: 1;
    padding: 24px;
    background: #fdf6e4;
  `,
  handleStyle: css`
    height: 40px;
  `,
  clearButton: css`
    align-items: center;
  `,
  keyboardContainer: css`
    flex: 1;
  `,
};

export default LocationSlider;
