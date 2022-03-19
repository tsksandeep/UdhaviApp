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
import { Entypo } from '@expo/vector-icons';
import { HStack } from 'native-base';

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
        <HStack>
          <Entypo
            name="location-pin"
            size={34}
            style={UserLocationStyles.locationPin}
          />
          <Text numberOfLines={1} style={UserLocationStyles.addressText}>
            {props.app?.requestAddress ||
              userLocation ||
              'Your location (Auto detecting)'}
          </Text>
        </HStack>
      </View>
    </Pressable>
  );
};

const UserLocationStyles = {
  container: css`
    padding: 10px 0;
    margin-top: 10px;
  `,
  addressText: css`
    font-size: 16px;
    color: #560cce;
    position: relative;
    left: -5px;
  `,
  locationPin: css`
    color: #232323;
    position: relative;
    left: -5px;
    top: -8px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(UserLocation);
