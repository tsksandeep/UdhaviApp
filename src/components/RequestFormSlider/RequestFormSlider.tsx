import React, { useCallback, useMemo, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import RequestForm from '../RequestForm/RequestForm';
import { css } from '@emotion/native';
import SliderHandle from '../SliderHandle/SliderHandle';

const RequestFormSlider = ({
  backdropComponent,
  snapPoints,
  category,
}: {
  backdropComponent: any;
  snapPoints: Array<string>;
  category: string;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointsMemo = useMemo(() => snapPoints, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={RequestFormSliderStyles.keyboardContainer}
    >
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
          <RequestForm category={category} />
        </BottomSheet>
      </View>
    </KeyboardAvoidingView>
  );
};

const RequestFormSliderStyles = {
  keyboardContainer: css`
    flex: 1;
  `,
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
