import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import RequestForm from '../RequestForm/RequestForm';
import { css } from '@emotion/native';
import SliderHandle from '../SliderHandle/SliderHandle';

const RequestFormSlider = ({
  backdropComponent,
  snapPoints,
}: {
  backdropComponent: any;
  snapPoints: Array<string>;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointsMemo = useMemo(() => snapPoints, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <View style={RequestFormSliderStyles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPointsMemo}
        animateOnMount={true}
        backdropComponent={backdropComponent}
        onChange={handleSheetChanges}
        handleComponent={SliderHandle}
        handleStyle={RequestFormSliderStyles.handleStyle}
      >
        <RequestForm showHeading={true} />
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
};

export default RequestFormSlider;
