import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { css } from '@emotion/native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { useEffect } from 'react';

const totalStatusBarHeight = (10 + getStatusBarHeight()).toString();
const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;

type Props = {
  setShowLocationSlider: any;
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
      setUserLocation(
        `${city || ''}, ${district || subregion || ''}, ${region || ''}, ${
          country || ''
        }`,
      );
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
          {userLocation || 'Your location....'}
        </Text>
      </View>
    </Pressable>
  );
};

const UserLocationStyles = {
  container: css`
    margin-top: ${totalStatusBarHeight}px;
    border: 1px solid black;
    padding: 10px;
  `,
  addressText: css`
    font-size: 16px;
    color: #560cce;
  `,
};

export default UserLocation;
