import React from 'react';
import { View, ScrollView } from 'react-native';
import { css } from '@emotion/native';
import PlacesAutoComplete from '../components/PlacesAutoComplete/PlacesAutoComplete';
import {} from 'react-native-gesture-handler';

const GetLocation = ({ handleClose }: { handleClose: Function }) => {
  return (
    <View style={getLocationStyles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={getLocationStyles.view}
      >
        <PlacesAutoComplete handleClose={handleClose} />
      </ScrollView>
    </View>
  );
};

const getLocationStyles = {
  container: css`
    background: white;
    padding: 10px;
    height: 100%;
    width: 100%;
  `,
  view: css`
    width: 100%;
    overflow: visible;
  `,
  header: css`
    width: 100%;
    text-align: center;
    font-family: 'Pacifico';
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    color: #560cce;
  `,
};

export default GetLocation;
