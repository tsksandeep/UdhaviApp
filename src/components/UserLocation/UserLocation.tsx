import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { css } from '@emotion/native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import bindDispatch from '../../utils/actions';
import { AppInitialState } from '../../store/reducers/app';
import { createSelector } from 'reselect';

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;

type Props = {
  setShowLocationSlider: any;
  actions: any;
  app: AppInitialState;
};

const UserLocation = (props: Props) => {
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      let { longitude, latitude } = coords;
      let regionName = await Location.reverseGeocodeAsync({
        longitude,
        latitude,
      });
      const { city, district, region, country, subregion } = regionName[0];
      const addressText = `${city || ''}, ${district || subregion || ''}, ${
        region || ''
      }, ${country || ''}`;
      setUserLocation(addressText);
      props.actions.updateRequestAddress(addressText);
    }
  };

  return (
    <Pressable
      onPress={() => {
        props.setShowLocationSlider(true);
      }}
    >
      <View style={UserLocationStyles.container}>
        <Text numberOfLines={1} style={UserLocationStyles.addressText}>
          {props.app?.requestAddress || userLocation || 'Your location....'}
        </Text>
      </View>
    </Pressable>
  );
};

const UserLocationStyles = {
  container: css`
    border: 1px solid black;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  `,
  addressText: css`
    font-size: 16px;
    color: #560cce;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(UserLocation);
