import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { css } from '@emotion/native';

import RequestList from '../RequestList/RequestList';
import SliderHandle from '../SliderHandle/SliderHandle';

const RequestSlider = ({ backdropComponent }: { backdropComponent: any }) => {
  const flatlistRef = useRef<BottomSheetFlatListMethods>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '75%'], []);

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
        <RequestList flatlistRef={flatlistRef} mode={'all'} />
      </BottomSheet>
    </View>
  );
};

const RequestFormSliderStyles = {
  container: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
  handleStyle: css`
    height: 20px;
  `,
};

export default RequestSlider;
