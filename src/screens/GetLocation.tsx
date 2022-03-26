import React from 'react';
import { View, ScrollView } from 'react-native';
import { css } from '@emotion/native';
import PlacesAutoComplete from '../components/PlacesAutoComplete/PlacesAutoComplete';
import {} from 'react-native-gesture-handler';

const GetLocation = ({ handleClose }: { handleClose: Function }) => {
  return (
    <View style={getLocationStyles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <PlacesAutoComplete
          styles={getLocationStyles.locationInput}
          handleClose={handleClose}
        />
      </ScrollView>
    </View>
  );
};

const getLocationStyles = {
  container: css`
    background: white;
    padding: 10px;
    height: 100%;
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
  locationInput: css`
    width: 100%;
    background: white;
    flex-direction: column;
    position: relative;
    margin-top: 10px;
  `,
};

export default GetLocation;
