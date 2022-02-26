import { css } from '@emotion/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RequestFormComponent from '../components/RequestForm/RequestForm';

const Request = () => {
  return (
    <SafeAreaView style={EntityStyle.submitRequest}>
      <KeyboardAwareScrollView>
        <RequestFormComponent showHeading={true} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const EntityStyle = {
  container: css`
    flex: 1;
    background: white;
    padding: 70px 30px 0px 30px;
  `,
  submitRequest: css`
    height: 100%;
  `,
};

export default Request;
