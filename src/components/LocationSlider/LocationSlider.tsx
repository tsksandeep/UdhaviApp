import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import BottomSheet, { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { css } from '@emotion/native';
import { AppInitialState } from '../../store/reducers/app';
import { VolunteerSelectionInitialState } from '../../store/reducers/volunteerSelection';
import SliderHandle from '../SliderHandle/SliderHandle';
import GetLocation from '../../screens/GetLocation';
import clearIcon from '../../assets/images/clear.png';

const LocationSlider = ({
  backdropComponent,
  setShowLocationSlider,
}: {
  actions: any;
  app: AppInitialState;
  volunteerSelection: VolunteerSelectionInitialState;
  backdropComponent: any;
  setShowLocationSlider: any;
  showLocationSlider: boolean;
}) => {
  const flatlistRef = useRef<BottomSheetFlatListMethods>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    if (setShowLocationSlider) {
      setShowLocationSlider(false);
    }
  };

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
        <TouchableOpacity
          onPress={handleClosePress}
          style={RequestFormSliderStyles.clearButton}
        >
          <Image source={clearIcon} style={{ height: 32, width: 32 }} />
        </TouchableOpacity>
        <GetLocation />
      </BottomSheet>
    </View>
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
};

export default LocationSlider;
