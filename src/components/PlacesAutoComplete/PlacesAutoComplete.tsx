import React, { useRef } from 'react';
import { HStack } from 'native-base';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { css, ReactNativeStyle } from '@emotion/native';
import * as Location from 'expo-location';
import { createSelector } from 'reselect';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../Button/Button';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import { searchBarStyles } from './constants/searchBar';

type PlacesAutoCompleteProps = {
  actions: any;
  app: AppInitialState;
  styles: ReactNativeStyle;
  handleClose: Function;
};

const screenWidth = Dimensions.get('window').width - 3;
const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);

const PlacesAutoComplete = React.forwardRef(
  (props: PlacesAutoCompleteProps) => {
    const { actions, styles, handleClose } = props;

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
      return `${city || ''}, ${district || subregion || ''}, ${region || ''}, ${
        country || ''
      }`;
    };

    const setLocationCallback = async () => {
      if (!inputRef || !inputRef.current) {
        return;
      }

      inputRef.current.setAddressText('Detecting location...');
      const addressText = await fetchCurrentLocation();
      actions.updateRequestAddress(addressText);
      inputRef.current.setAddressText(addressText);
    };

    return (
      <>
        <HStack space={1} style={styles || PlacesAutoCompleteStyle.search}>
          <GooglePlacesAutocomplete
            styles={searchBarStyles(!!styles)}
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
        </HStack>
        <TouchableOpacity onPress={() => setLocationCallback()}>
          <HStack style={PlacesAutoCompleteStyle.currentAddressContainer}>
            <MaterialIcons
              style={PlacesAutoCompleteStyle.image}
              name="my-location"
              size={24}
              color="black"
            />
            <Text style={PlacesAutoCompleteStyle.text}>
              Use Current Location
            </Text>
          </HStack>
        </TouchableOpacity>
        <Button
          mode="outlined"
          onPress={() => handleClose()}
          style={PlacesAutoCompleteStyle.closeButton}
        >
          Close
        </Button>
      </>
    );
  },
);

const PlacesAutoCompleteStyle = {
  search: css`
    position: absolute;
    align-items: center;
    top: 3px;
    left: 2px;
    width: ${screenWidth}px;
    background-color: white;
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
    margin-top: 30px;
    margin-bottom: 20px;
    border: 2px solid rgb(196, 34, 255);
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(PlacesAutoComplete);
