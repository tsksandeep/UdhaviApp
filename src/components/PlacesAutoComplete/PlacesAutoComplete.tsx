import React, { useRef } from 'react';
import { HStack } from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { css } from '@emotion/native';
import * as Location from 'expo-location';
import { createSelector } from 'reselect';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../Button/Button';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';

type PlacesAutoCompleteProps = {
  actions: any;
  app: AppInitialState;
  handleClose: Function;
};

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);

const getAddressText = (
  city: string | null,
  district: string | null,
  region: string | null,
  subregion: string | null,
  country: string | null,
): string => {
  var addressText = '';
  if (city) {
    addressText += city + ', ';
  }
  if (district) {
    addressText += district + ', ';
  } else if (subregion) {
    addressText += subregion + ', ';
  }
  if (region) {
    addressText += region;
  } else if (country) {
    addressText += country;
  }
  return addressText;
};

const PlacesAutoComplete = (props: PlacesAutoCompleteProps) => {
  const { actions, handleClose } = props;

  let inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const setLocationByAutoCompleteResult = (apiData: any) => {
    actions.updateRequestAddress(apiData.description);
  };

  const fetchCurrentLocation = async (): Promise<string> => {
    let { coords } = await Location.getCurrentPositionAsync();
    if (!coords) {
      return 'unable to detect location...';
    }

    let { longitude, latitude } = coords;
    let regionName = await Location.reverseGeocodeAsync({
      longitude,
      latitude,
    });
    const { city, district, region, country, subregion } = regionName[0];
    return getAddressText(city, district, region, subregion, country);
  };

  const setLocationCallback = async () => {
    if (!inputRef || !inputRef.current) {
      return;
    }

    inputRef.current.setAddressText('Detecting current location...');
    const addressText = await fetchCurrentLocation();
    actions.updateRequestAddress(addressText);
    inputRef.current.setAddressText(addressText);
  };

  return (
    <>
      <View style={PlacesAutoCompleteStyle.input}>
        <GooglePlacesAutocomplete
          suppressDefaultStyles
          placeholder="Search address"
          onPress={(data) => {
            setLocationByAutoCompleteResult(data);
          }}
          ref={inputRef}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
            components: 'country:in',
          }}
          enablePoweredByContainer={false}
        />
      </View>
      <TouchableOpacity onPress={() => setLocationCallback()}>
        <HStack style={PlacesAutoCompleteStyle.currentAddressContainer}>
          <MaterialIcons
            style={PlacesAutoCompleteStyle.image}
            name="my-location"
            size={24}
            color="black"
          />
          <Text style={PlacesAutoCompleteStyle.text}>Use Current Location</Text>
        </HStack>
      </TouchableOpacity>
      <Button
        mode="outlined"
        onPress={handleClose}
        style={PlacesAutoCompleteStyle.closeButton}
      >
        Close
      </Button>
    </>
  );
};

const PlacesAutoCompleteStyle = {
  input: css`
    width: 100%;
    border: 2px solid #560cce;
    border-radius: 10px;
    shadow-offset: 2px;
    shadow-color: #171717;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    padding: 10px;
  `,
  image: css`
    margin-right: 5px;
  `,
  text: css`
    color: #560cce;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    top: 3px;
  `,
  currentAddressContainer: css`
    margin-top: 20px;
  `,
  closeButton: css`
    margin: 30px auto 20px auto;
    background: #560cce;
    border: none;
    width: 200px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(PlacesAutoComplete);
